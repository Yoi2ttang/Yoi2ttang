package com.ssafy.yoittang.dashboard.domain.dto.response;

import java.time.LocalDate;

public record MemberDailyDistanceResponse(
        LocalDate date,
        Double distance
) {
}
