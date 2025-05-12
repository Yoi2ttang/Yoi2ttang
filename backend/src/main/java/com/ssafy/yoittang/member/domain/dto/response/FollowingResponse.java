package com.ssafy.yoittang.member.domain.dto.response;

import com.ssafy.yoittang.zodiac.domain.ZodiacName;

public record FollowingResponse(
        Long memberId,
        String nickname,
        String profileImageUrl,
        ZodiacName zodiacName,
        Boolean isFollow
) {
}
