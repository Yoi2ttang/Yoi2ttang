package com.ssafy.yoittang.member.domain.dto.response;

import java.util.List;

import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.running.domain.dto.response.RunningTimeResponse;
import com.ssafy.yoittang.zodiac.domain.ZodiacName;

public record MyProfileResponse(
        Long memberId,
        String nickname,
        String profileImageUrl,
        ZodiacName zodiacName,
        String stateMessage,
        Integer followingCount,
        Integer followerCount,
        RunningTimeResponse time,
        Double totalDistance,
        Integer totalTileCount,
        List<CourseSummaryResponse> courses
) {
}
