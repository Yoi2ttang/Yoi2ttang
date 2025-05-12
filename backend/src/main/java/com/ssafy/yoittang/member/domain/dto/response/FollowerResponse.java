package com.ssafy.yoittang.member.domain.dto.response;

import com.ssafy.yoittang.zodiac.domain.ZodiacName;

public record FollowerResponse(
        Long memberId,
        String nickname,
        String profileImageUrl,
        ZodiacName zodiacName
) {
}
