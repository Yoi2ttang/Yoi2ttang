package com.ssafy.yoittang.auth.domain.response;

public record LoginResponse(
        Long memberId,
        String accessToken,
        String refreshToken
) {
    public static LoginResponse from(
            Long memberId,
            String accessToken,
            String refreshToken
    ) {
        return new LoginResponse(
                memberId,
                accessToken,
                refreshToken
        );
    }
}
