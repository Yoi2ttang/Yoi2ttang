package com.ssafy.yoittang.runningpoint.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyDistanceResponse;

public interface RunningPointQueryRepository {
    Double findTotalDistanceByMemberId(Long memberId);

    Double findLastMonthDistanceByMemberId(Long memberId, LocalDateTime startDate, LocalDateTime endDate);

    List<MemberDailyDistanceResponse> findDailyDistancesByPeriod(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}
