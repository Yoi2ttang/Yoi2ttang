package com.ssafy.yoittang.running.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.yoittang.dashboard.domain.dto.response.DateAndSeconds;

public interface RunningQueryRepository {
    List<DateAndSeconds> findDailyRunningSecondsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    List<Long> findPagedClearedMemberIdsByCourseId(Long courseId, String pageToken, int pageSize);
}
