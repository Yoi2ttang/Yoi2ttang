package com.ssafy.yoittang.member.domain.dto.response;

import com.ssafy.yoittang.running.domain.dto.response.RunningTimeResponse;
import com.ssafy.yoittang.zordiac.domain.ZordiacName;

public record MemberProfileResponse(
        Long memberId,
        String nickname,
        String profileImageUrl,
        ZordiacName zordiacName,
        String stateMessage,
        Integer followingCount,
        Integer followerCount,
        Boolean isFollow,
        RunningTimeResponse time,
        Integer totalDistance,
        Integer totalTileCount
) {
}
