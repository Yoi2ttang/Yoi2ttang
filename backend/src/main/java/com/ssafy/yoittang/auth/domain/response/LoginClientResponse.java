package com.ssafy.yoittang.auth.domain.response;

public record LoginClientResponse(String accessToken, String refreshToken
) {
    public static LoginClientResponse from(
            LoginResponse loginResponse
    ) {
        return new LoginClientResponse(
                loginResponse.accessToken(),
                loginResponse.socialId()
        );
    }
}
