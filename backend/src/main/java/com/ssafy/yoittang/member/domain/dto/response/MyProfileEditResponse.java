package com.ssafy.yoittang.member.domain.dto.response;

import java.time.LocalDate;

import com.ssafy.yoittang.member.domain.DisclosureStatus;
import com.ssafy.yoittang.member.domain.Gender;

public record MyProfileEditResponse(
        Long memberId,
        String email,
        String nickname,
        String profileImageUrl,
        LocalDate birthdate,
        String stateMessage,
        DisclosureStatus disclosureStatus,
        Gender gender,
        Float weight
) {
}
