package com.ssafy.yoittang.auth.domain.request;

import java.time.LocalDate;

import com.ssafy.yoittang.member.domain.Gender;
import com.ssafy.yoittang.term.domain.request.MemberTermCreateRequest;

public record SignupRequest(
        String socialId,
        MemberTermCreateRequest agreements,
        String nickname,
        LocalDate birth,
        Gender gender,
        Float weight
) {
}
