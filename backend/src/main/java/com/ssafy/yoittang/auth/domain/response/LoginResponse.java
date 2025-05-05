package com.ssafy.yoittang.auth.domain.response;

public record LoginResponse(Long memberId, String accessToken, String refreshToken, String socialId) {
    public static LoginResponse from(
            Long memberId,
            String accessToken,
            String refreshToken,
            String socialId
    ) {
        return new LoginResponse(
                memberId,
                accessToken,
                refreshToken,
                socialId
        );
    }
}
