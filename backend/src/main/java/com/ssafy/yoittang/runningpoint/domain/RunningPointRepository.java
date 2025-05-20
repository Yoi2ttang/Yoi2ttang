package com.ssafy.yoittang.runningpoint.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RunningPointRepository extends JpaRepository<RunningPoint, Long>, RunningPointJdbcRepository {
    @Query(value = """
        SELECT SUM(ST_Length(rp.route::geography))
        FROM runnings r
        JOIN running_points rp ON rp.running_id = r.running_id
        WHERE r.member_id = :memberId AND r.state = 'COMPLETE'
        """, nativeQuery = true)
    Double findTotalDistanceByMemberId(@Param("memberId") Long memberId);

    @Query(value = """
        SELECT SUM(ST_Length(rp.route::geography))
        FROM running_points rp
        LEFT JOIN runnings r ON rp.running_id = r.running_id
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

    @Query(value = """
        SELECT
            CAST(rp.arrival_time AS DATE) AS date,
            SUM(ST_Length(rp.route::geography)) AS total_distance
        FROM runnings r
        JOIN running_points rp ON rp.running_id = r.running_id
        WHERE r.member_id = :memberId
          AND r.state = 'COMPLETE'
          AND rp.arrival_time >= :startDate
          AND rp.arrival_time < :endDate
        GROUP BY date
        ORDER BY date ASC
        """, nativeQuery = true)
    List<Object[]> findDailyDistancesRaw(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query(value = """
            SELECT *
            FROM running_points rp
            WHERE (rp.running_id, rp.sequence) IN (
                SELECT running_id, MAX(sequence)
                FROM running_points
                WHERE running_id IN(:runningIds)
                GROUP BY running_id
            """, nativeQuery = true)
    List<RunningPoint> findLastPointsByRunningIds(@Param("runningIds") List<Long> runningIds);

    List<RunningPoint> findByRunningIdOrderBySequence(Long runningId);
}
