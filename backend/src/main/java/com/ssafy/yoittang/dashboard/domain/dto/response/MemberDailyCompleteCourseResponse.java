package com.ssafy.yoittang.dashboard.domain.dto.response;

import java.time.LocalDate;

public record MemberDailyCompleteCourseResponse(
        LocalDate date,
        Integer completeCourseCount
) {
}
