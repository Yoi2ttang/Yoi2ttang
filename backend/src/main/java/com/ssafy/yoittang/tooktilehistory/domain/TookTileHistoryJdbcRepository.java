package com.ssafy.yoittang.tooktilehistory.domain;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.yoittang.dashboard.domain.dto.response.CoursePointResponse;

public interface TookTileHistoryJdbcRepository {
    void insertTookTileHistory(LocalDate localDate);

    List<CoursePointResponse> getTookTileHistoryGroupByPeriodJdbc(
            Long zodiacId,
            LocalDate startDate,
            LocalDate endDate,
            Period period,
            Order order
    );
}
