package com.ssafy.yoittang.runningpoint.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyDistanceResponse;

public interface RunningPointQueryRepository {
    @Query(value = """
        SELECT SUM(ST_Length(rp.root::geography))
        FROM runnings r
        JOIN running_points rp ON rp.running_id = r.running_id
        WHERE r.member_id = :memberId AND r.state = 'COMPLETE'
        """, nativeQuery = true)
    Double findTotalDistanceByMemberId(@Param("memberId") Long memberId);

    @Query(value = """
        SELECT SUM(ST_Length(rp.root::geography))
        FROM runnings r
        JOIN running_points rp ON rp.running_id = r.running_id
        WHERE r.member_id = :memberId
          AND r.state = 'COMPLETE'
          AND rp.arrival_time >= :startDate
          AND rp.arrival_time < :endDate
        """, nativeQuery = true)
    Double findLastMonthDistanceByMemberId(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    List<MemberDailyDistanceResponse> findDailyDistancesByPeriod(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}
