package com.ssafy.yoittang.dashboard.domain.dto.response;

import java.time.LocalDate;

public record CoursePointResponse(
        LocalDate date,
        Integer count
) { }
