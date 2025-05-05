package com.ssafy.yoittang.member.domain.dto.response;

public record MemberAutocompleteResponse(
        Long memberId,
        String nickname
) {
}
