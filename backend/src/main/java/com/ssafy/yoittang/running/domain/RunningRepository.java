package com.ssafy.yoittang.running.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RunningRepository extends JpaRepository<Running, Long>, RunningQueryRepository {

    Optional<Running> findByRunningIdAndMemberId(Long runningId, Long memberId);

    boolean existsByRunningIdAndMemberId(Long runningId, Long memberId);


    @Query(value = """
            SELECT SUM(EXTRACT(EPOCH FROM (r.end_time - r.start_time)))
            FROM runnings r
            WHERE r.member_id = :memberId AND r.state = 'COMPLETE'
        """, nativeQuery = true)
    Double findTotalRunningSecondsByMemberId(@Param("memberId") Long memberId);


    @Query(value = """
            SELECT SUM(EXTRACT(EPOCH FROM (r.end_time - r.start_time)))
            FROM runnings r
            WHERE r.member_id = :memberId
            AND r.state = 'COMPLETE'
            AND r.start_time >= :startDate
            AND r.start_time < :endDate
            AND r.end_time >= :startDate
            AND r.end_time < :endDate
        """, nativeQuery = true)
    Double findTotalRunningSecondsByMemberIdAndDateRange(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query(value = """
            SELECT r.course_id
            FROM runnings r
            WHERE r.member_id = :memberId
                AND r.state = 'COMPLETE'
                AND r.start_time >= :startDate
                AND r.start_time < :endDate
                AND r.end_time >= :startDate
                AND r.end_time < :endDate
                AND r.course_id IS NOT NULL
        """, nativeQuery = true)
    List<Long> findCourseIdsByMemberIdAndStartTimeBetween(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query(value = """
            SELECT *
            FROM runnings r
            WHERE r.member_id = :memberId
                AND r.state = 'COMPLETE'
                AND end_time IS NOT NULL
            ORDER BY end_time DESC
            LIMIT :limit
            """, nativeQuery = true)
    List<Running> findRecentCompleteRunning(
            @Param("memberId") Long memberId,
            @Param("limit") int limit
    );

    @Query(value = """
            SELECT *
            FROM runnings r
            WHERE r.member_id = :memberId
                AND r.state = 'COMPLETE'
                AND end_time IS NOT NULL
            ORDER BY end_time DESC
            """, nativeQuery = true)
    List<Running> findCompleteRunning(
            @Param("memberId") Long memberId
    );
}
