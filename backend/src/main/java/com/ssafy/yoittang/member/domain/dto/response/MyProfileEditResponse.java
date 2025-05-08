package com.ssafy.yoittang.member.domain.dto.response;

import java.time.LocalDate;

import com.ssafy.yoittang.member.domain.DisclosureStatus;

public record MyProfileEditResponse(
        Long memberId,
        String nickname,
        String profileImageUrl,
        LocalDate birthdate,
        String stateMessage,
        DisclosureStatus disclosureStatus
) {
}
