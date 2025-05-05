package com.ssafy.yoittang.dashboard.domain.dto.response;

import java.time.LocalDate;

import com.ssafy.yoittang.running.domain.dto.response.RunningTimeResponse;

public record MemberDailyRunningTimeResponse(
        LocalDate date,
        RunningTimeResponse runningDuration
) {
}
