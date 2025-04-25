package com.ssafy.yoittang.auth.domain.request;

import java.time.LocalDate;

public record SignupRequest(
        String socialId,
        String nickname,
        String profileImageUrl,
        LocalDate birthDate
) {
}
