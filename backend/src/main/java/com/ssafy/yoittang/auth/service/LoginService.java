package com.ssafy.yoittang.auth.service;

import java.time.Duration;
import java.util.Optional;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.auth.JwtUtil;
import com.ssafy.yoittang.auth.domain.MemberTokens;
import com.ssafy.yoittang.auth.domain.RefreshToken;
import com.ssafy.yoittang.auth.domain.request.JwtRequest;
import com.ssafy.yoittang.auth.domain.request.LoginRequest;
import com.ssafy.yoittang.auth.domain.request.SignupRequest;
import com.ssafy.yoittang.auth.domain.response.LoginClientResponse;
import com.ssafy.yoittang.auth.domain.response.LoginResponse;
import com.ssafy.yoittang.auth.infrastructure.KakaoMemberInfo;
import com.ssafy.yoittang.auth.infrastructure.KakaoOAuthProvider;
import com.ssafy.yoittang.auth.repository.RefreshTokenRepository;
import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.member.domain.DisclosureStatus;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.MemberRedisEntity;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;
import com.ssafy.yoittang.term.domain.MemberTerm;
import com.ssafy.yoittang.term.domain.repository.MemberTermJpaRepository;
import com.ssafy.yoittang.term.domain.request.MemberTermCreateRequest;
import com.ssafy.yoittang.zordiac.domain.ZordiacName;
import com.ssafy.yoittang.zordiac.domain.repository.ZordiacJpaRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LoginService {
    private static final String REDIS_PREFIX = "PRE_MEMBER:";
    private static final Duration TTL = Duration.ofMinutes(30);
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;
    private final MemberTermJpaRepository memberTermJpaRepository;
    private final ZordiacJpaRepository zordiacJpaRepository;
    private final JwtUtil jwtUtil;
    private final KakaoOAuthProvider kakaoOAuthProvider;
    private final RedisTemplate<String, MemberRedisEntity> redisTemplate;

    public LoginResponse login(LoginRequest loginRequest) {
        String kakaoAccessToken = kakaoOAuthProvider.fetchKakaoAccessToken(
                loginRequest.getCode(),
                loginRequest.getEnvironment()
        );

        KakaoMemberInfo kakaoMemberInfo = kakaoOAuthProvider.getMemberInfo(kakaoAccessToken);

        Optional<Member> optionalMember = memberRepository.findBySocialId(kakaoMemberInfo.getSocialLoginId());

        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            ZordiacName zordiacName = zordiacJpaRepository.findZordiacNameByZordiacId(member.getZordiacId());
            JwtRequest jwtRequest = new JwtRequest(
                    member.getMemberId(),
                    member.getNickname(),
                    member.getZordiacId(),
                    zordiacName.toString()
            );
            MemberTokens memberTokens = jwtUtil.createLoginToken(jwtRequest);
            //MemberTokens memberTokens = jwtUtil.createLoginToken(member.getMemberId().toString());
            refreshTokenRepository.save(new RefreshToken(member.getMemberId(), memberTokens.getRefreshToken()));
            return LoginResponse.from(
                    memberTokens.getAccessToken(),
                    memberTokens.getRefreshToken(),
                    null
            );
        } else {
            return preRegister(
                    kakaoMemberInfo.getSocialLoginId(),
                    kakaoMemberInfo.getEmail(),
                    kakaoMemberInfo.getNickname(),
                    kakaoMemberInfo.getProfileImageUrl()
            );
        }
    }

    public void logout(String refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }

    public String reissueAccessToken(String refreshToken, String authHeader) {
        String accessToken = authHeader.split(" ")[1];

        jwtUtil.validateRefreshToken(refreshToken);

        if (jwtUtil.isAccessTokenValid(accessToken)) {
            return accessToken;
        }

        if (jwtUtil.isAccessTokenExpired(accessToken)) {
            RefreshToken foundRefreshToken = refreshTokenRepository.findById(refreshToken)
                    .orElseThrow(() -> new BadRequestException(ErrorCode.INVALID_REFRESH_TOKEN));
            return jwtUtil.reissueAccessToken(foundRefreshToken.getMemberId().toString());
        }

        throw new BadRequestException(ErrorCode.FAILED_TO_VALIDATE_TOKEN);
    }

    @Transactional
    public LoginResponse finalizeSignup(SignupRequest signupRequest) {
        MemberRedisEntity cache = getMemberRedisEntity(signupRequest.socialId());

        String finalNickname = Optional.ofNullable(signupRequest.nickname())
                .filter(n -> !n.isBlank())
                .orElse(cache.getNickname());

        MemberTermCreateRequest agreements = signupRequest.agreements();

        int birthYear = signupRequest.birth().getYear();

        Long zordiacId = calculateZordiacId(birthYear);

        Member member = memberRepository.save(
                Member.builder()
                        .zordiacId(zordiacId)
                        .socialId(cache.getSocialId())
                        .email(cache.getEmail())
                        .birthDate(signupRequest.birth())
                        .nickname(finalNickname)
                        .profileImageUrl(cache.getProfileImageUrl())
                        .gender(signupRequest.gender())
                        .weight(signupRequest.weight())
                        .disclosure(DisclosureStatus.ALL)
                        .stateMessage(null)
                        .build()
        );
        saveMemberTerm(agreements, member);
        ZordiacName zordiacName = zordiacJpaRepository.findZordiacNameByZordiacId(member.getZordiacId());
        JwtRequest jwtRequest = new JwtRequest(
                member.getMemberId(),
                member.getNickname(),
                member.getZordiacId(),
                zordiacName.toString()
        );
        MemberTokens memberTokens = jwtUtil.createLoginToken(jwtRequest);
        //MemberTokens memberTokens = jwtUtil.createLoginToken(member.getMemberId().toString());
        refreshTokenRepository.save(new RefreshToken(member.getMemberId(), memberTokens.getRefreshToken()));
        return LoginResponse.from(
                memberTokens.getAccessToken(),
                memberTokens.getRefreshToken(),
                null
        );
    }

    public LoginClientResponse getLoginClientResponse(LoginResponse loginResponse) {
        return LoginClientResponse.from(loginResponse);
    }

    private LoginResponse preRegister(String socialId, String email, String nickname, String profileImageUrl) {
        MemberRedisEntity memberRedisEntity = MemberRedisEntity.builder()
                .socialId(socialId)
                .email(email)
                .nickname(nickname)
                .profileImageUrl(profileImageUrl)
                .build();

        String key = REDIS_PREFIX + memberRedisEntity.getSocialId();
        redisTemplate.opsForValue().set(key, memberRedisEntity);
        return LoginResponse.from(
                null,
                null,
                socialId
        );
    }

    private MemberRedisEntity getMemberRedisEntity(String socialId) {
        String redisKey = REDIS_PREFIX + socialId;
        return Optional.ofNullable(redisTemplate.opsForValue().get(redisKey))
                .orElseThrow(() -> new BadRequestException(ErrorCode.INVALID_SIGNUP_TOKEN));
    }

    private Long calculateZordiacId(int birthYear) {
        int[] zordiacIdByRemainder = {9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8};
        return (long) zordiacIdByRemainder[birthYear % 12];
    }

    private void saveMemberTerm(MemberTermCreateRequest agreements, Member member) {
        if (agreements.privacy()) {
            memberTermJpaRepository.save(
                    MemberTerm.builder()
                            .termId(1L)
                            .memberId(member.getMemberId())
                            .agree(true)
                            .build()
            );
        }
        if (agreements.location()) {
            memberTermJpaRepository.save(
                    MemberTerm.builder()
                            .termId(2L)
                            .memberId(member.getMemberId())
                            .agree(true)
                            .build()
            );
        }
        memberTermJpaRepository.save(
                MemberTerm.builder()
                        .termId(3L)
                        .memberId(member.getMemberId())
                        .agree(agreements.marketing())
                        .build()
        );
    }
}
