package com.ssafy.yoittang.member.domain.dto.request;

import com.ssafy.yoittang.member.domain.DisclosureStatus;

public record MemberUpdateRequest(
        String nickname,
        String stateMessage,
        DisclosureStatus disclosureStatus,
        Float weight
) {
}
