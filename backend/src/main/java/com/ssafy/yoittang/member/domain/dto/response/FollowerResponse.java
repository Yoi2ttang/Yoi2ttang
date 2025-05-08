package com.ssafy.yoittang.member.domain.dto.response;

import com.ssafy.yoittang.zordiac.domain.ZordiacName;

public record FollowerResponse(
        Long memberId,
        String nickname,
        String profileImageUrl,
        ZordiacName zordiacName
) {
}
