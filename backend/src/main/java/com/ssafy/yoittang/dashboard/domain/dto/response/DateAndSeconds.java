package com.ssafy.yoittang.dashboard.domain.dto.response;

import java.time.LocalDate;

public record DateAndSeconds(
        LocalDate date,
        Double totalSeconds
) {
}
