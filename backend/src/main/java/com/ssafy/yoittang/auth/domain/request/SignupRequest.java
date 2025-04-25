package com.ssafy.yoittang.auth.domain.request;

import java.time.LocalDateTime;

public record SignupRequest(
        String socialId,
        String nickname,
        String profileImageUrl,
        LocalDateTime birthDate
) {
}
