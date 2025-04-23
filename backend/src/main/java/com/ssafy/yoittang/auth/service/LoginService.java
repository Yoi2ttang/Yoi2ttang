package com.ssafy.yoittang.auth.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.auth.JwtUtil;
import com.ssafy.yoittang.auth.domain.MemberTokens;
import com.ssafy.yoittang.auth.domain.RefreshToken;
import com.ssafy.yoittang.auth.domain.request.LoginRequest;
import com.ssafy.yoittang.auth.domain.response.LoginResponse;
import com.ssafy.yoittang.auth.infrastructure.KakaoMemberInfo;
import com.ssafy.yoittang.auth.infrastructure.KakaoOAuthProvider;
import com.ssafy.yoittang.auth.repository.RefreshTokenRepository;
import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.member.domain.DisclosureStatus;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LoginService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final KakaoOAuthProvider kakaoOAuthProvider;

    public LoginResponse login(LoginRequest loginRequest) {
        String kakaoAccessToken = kakaoOAuthProvider.fetchKakaoAccessToken(
                loginRequest.getCode(),
                loginRequest.getEnvironment()
        );

        KakaoMemberInfo kakaoMemberInfo = kakaoOAuthProvider.getMemberInfo(kakaoAccessToken);

        Member member = findOrCreateMember(
                kakaoMemberInfo.getSocialLoginId(),
                kakaoMemberInfo.getSocialLoginId(),
                kakaoMemberInfo.getProfileImageUrl()
        );

        MemberTokens memberTokens = jwtUtil.createLoginToken(member.getId().toString());
        RefreshToken refreshToken = new RefreshToken(member.getId(), memberTokens.getRefreshToken());
        refreshTokenRepository.save(refreshToken);
        LoginResponse loginResponse = LoginResponse.from(
                member.getId(),
                memberTokens.getAccessToken(),
                memberTokens.getRefreshToken()
        );
        return loginResponse;
    }

    private Member findOrCreateMember(String socialId, String nickname, String profileImageUrl) {
        return memberRepository.findBySocialId(socialId)
                .orElseGet(() -> createMember(socialId, nickname, profileImageUrl));
    }

    private Member createMember(String socialId, String nickname, String profileImageUrl) {
        Member member = memberRepository.save(
                Member.builder()
                        .zordiacId(1L)
                        .socialId(socialId)
                        .birthDate(LocalDateTime.now())
                        .nickname(nickname)
                        .profileImageUrl(profileImageUrl)
                        .disclosure(DisclosureStatus.ALL)
                        .stateMessage("기본")
                        .build()
        );
        return member;
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
}
