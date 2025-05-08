package com.ssafy.yoittang.member.domain.dto.response;

import com.ssafy.yoittang.zordiac.domain.ZordiacName;

public record MemberSearchResponse(
        Long memberId,
        String nickname,
        String profileImageUrl,
        ZordiacName zordiacName,
        Boolean isFollow
) {
}
