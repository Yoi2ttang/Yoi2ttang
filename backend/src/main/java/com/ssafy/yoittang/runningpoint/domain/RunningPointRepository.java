package com.ssafy.yoittang.runningpoint.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RunningPointRepository extends JpaRepository<RunningPoint, Long>, RunningPointJdbcRepository {
//    @Query(value = """
//        SELECT SUM(ST_Length(rp.route::geography))
//        FROM runnings r
//        JOIN running_points rp ON rp.running_id = r.running_id
//        WHERE r.member_id = :memberId AND r.state = 'COMPLETE'
//        """, nativeQuery = true)
//    Double findTotalDistanceByMemberId(@Param("memberId") Long memberId);

    @Query(value = """
            WITH ordered_points AS (
                SELECT
                    rp.running_id,
                    ST_AsText((ST_DumpPoints(rp.route)).geom)::geometry(Point, 4326) AS geom,
                    rp.sequence
                FROM runnings r
                JOIN running_points rp ON rp.running_id = r.running_id
                WHERE r.member_id = :memberId
                  AND r.state = 'COMPLETE'
                  AND rp.sequence IS NOT NULL
            ),
            numbered_points AS (
                SELECT
                    running_id,
                    geom,
                    sequence,
                    ROW_NUMBER() OVER (PARTITION BY running_id ORDER BY sequence) AS rn
                FROM ordered_points
            ),
            point_pairs AS (
                SELECT
                    p1.running_id,
                    ST_DistanceSphere(p1.geom, p2.geom) AS segment_distance
                FROM numbered_points p1
                JOIN numbered_points p2
                  ON p1.running_id = p2.running_id
                 AND p1.rn + 1 = p2.rn
            )
            SELECT SUM(segment_distance) FROM point_pairs
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
