package com.ssafy.yoittang.runningpoint.domain;

import java.time.LocalDateTime;

public interface RunningPointQueryRepository {
    Double findTotalDistanceByMemberId(Long memberId);

    Double findLastMonthDistanceByMemberId(Long memberId, LocalDateTime startDate, LocalDateTime endDate);
}
