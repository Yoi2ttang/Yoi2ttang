package com.ssafy.yoittang.dashboard.domain.dto.response;

import java.time.LocalDate;

public record MemberDailyTileResponse(
        LocalDate date,
        Integer occupiedTileCount
) {

}