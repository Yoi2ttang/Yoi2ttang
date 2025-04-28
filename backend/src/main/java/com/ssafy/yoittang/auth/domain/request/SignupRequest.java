package com.ssafy.yoittang.auth.domain.request;

import java.time.LocalDate;

import com.ssafy.yoittang.member.domain.Gender;

public record SignupRequest(
        String socialId,
        String nickname,
        String profileImageUrl,
        LocalDate birthDate,
        Gender gender,
        Float weight
) {
}
