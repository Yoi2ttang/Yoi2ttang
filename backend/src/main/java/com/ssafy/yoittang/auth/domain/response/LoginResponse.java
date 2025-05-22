package com.ssafy.yoittang.auth.domain.response;

public record LoginResponse(String accessToken, String refreshToken, String socialId) {
    public static LoginResponse from(
            String accessToken,
            String refreshToken,
            String socialId
    ) {
        return new LoginResponse(
                accessToken,
                refreshToken,
                socialId
        );
    }
}
