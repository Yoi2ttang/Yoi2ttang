package com.ssafy.yoittang.auth.service;

import java.time.Duration;
import java.util.Optional;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.auth.JwtUtil;
import com.ssafy.yoittang.auth.domain.MemberTokens;
import com.ssafy.yoittang.auth.domain.RefreshToken;
import com.ssafy.yoittang.auth.domain.request.LoginRequest;
import com.ssafy.yoittang.auth.domain.request.SignupRequest;
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
import com.ssafy.yoittang.term.application.TermService;

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
    private final TermService termService;
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
            MemberTokens memberTokens = jwtUtil.createLoginToken(member.getMemberId().toString());
            refreshTokenRepository.save(new RefreshToken(member.getMemberId(), memberTokens.getRefreshToken()));
            return LoginResponse.from(
                    member.getMemberId(),
                    memberTokens.getAccessToken(),
                    memberTokens.getRefreshToken(),
                    null
            );
        } else {
            return preRegister(
                    kakaoMemberInfo.getSocialLoginId(),
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

    private LoginResponse preRegister(String socialId, String nickname, String profileImageUrl) {
        MemberRedisEntity memberRedisEntity = MemberRedisEntity.builder()
                .socialId(socialId)
                .nickname(nickname)
                .profileImageUrl(profileImageUrl)
                .build();
        String key = REDIS_PREFIX + memberRedisEntity.getSocialId();
        redisTemplate.opsForValue().set(key, memberRedisEntity);
        return LoginResponse.from(
                null,
                null,
                null,
                socialId
        );
    }

    public LoginResponse finalizeSignup(SignupRequest signupRequest) {
        MemberRedisEntity cache = getMemberRedisEntity(signupRequest.socialId());

        String finalNickname = Optional.ofNullable(signupRequest.nickname())
                .filter(n -> !n.isBlank())
                .orElse(cache.getNickname());

        String finalProfileImageUrl = Optional.ofNullable(signupRequest.profileImageUrl())
                .filter(url -> !url.isBlank())
                .orElse(cache.getProfileImageUrl());

        int birthYear = signupRequest.birthDate().getYear();
        Long zordiacId = calculateZordiacId(birthYear);

        Member member = memberRepository.save(
                Member.builder()
                        .zordiacId(zordiacId)
                        .socialId(cache.getSocialId())
                        .birthDate(signupRequest.birthDate())
                        .nickname(finalNickname)
                        .profileImageUrl(finalProfileImageUrl)
                        .gender(signupRequest.gender())
                        .weight(signupRequest.weight())
                        .disclosure(DisclosureStatus.ALL)
                        .stateMessage(null)
                        .build()
        );

        termService.persistMemberTerms(member, signupRequest.socialId());

        MemberTokens memberTokens = jwtUtil.createLoginToken(member.getMemberId().toString());
        refreshTokenRepository.save(new RefreshToken(member.getMemberId(), memberTokens.getRefreshToken()));
        return LoginResponse.from(
                member.getMemberId(),
                memberTokens.getAccessToken(),
                memberTokens.getRefreshToken(),
                null
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


}
