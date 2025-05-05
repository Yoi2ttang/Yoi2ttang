package com.ssafy.yoittang.dashboard.domain.dto.response;

import com.ssafy.yoittang.running.domain.dto.response.RunningTimeResponse;

public record MemberDashboardResponse(
        Long memberId,
        Integer duration,
        Double totalDistance,
        RunningTimeResponse runningDuration,
        Integer occupiedTileCount,
        Integer completeCourseCount
) {
}
