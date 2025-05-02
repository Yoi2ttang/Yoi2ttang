package com.ssafy.yoittang.running.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RunningRepository extends JpaRepository<Running, Long> {

    Optional<Running> findByRunningIdAndMemberId(Long runningId, Long memberId);

    boolean existsByRunningIdAndMemberId(Long runningId, Long memberId);


    @Query(value = """
            SELECT SUM(EXTRACT(EPOCH FROM (r.endTime - r.startTime)))
            FROM Running r
            WHERE r.memberId = :memberId AND r.state = 'COMPLETE'
        """, nativeQuery = true)
    Double findTotalRunningSecondsByMemberId(@Param("memberId") Long memberId);


    @Query(value = """
            SELECT SUM(EXTRACT(EPOCH FROM (r.endTime - r.startTime)))
            FROM Running r
            WHERE r.memberId = :memberId
            AND r.state = 'COMPLETE'
            AND r.startTime >= :startDate
            AND r.startTime < :endDate
            AND r.endTime >= :startDate
            AND r.endTime < :endDate
        """, nativeQuery = true)
    Double findTotalRunningSecondsByMemberIdAndDateRange(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query(value = """
            SELECT r.courseId
            FROM Running r
            WHERE r.memberId = :memberId
                AND r.state = 'COMPLETE'
                AND r.startTime >= :startDate
                AND r.startTime < :endDate
                AND r.endTime >= :startDate
                AND r.endTime < :endDate
                AND r.courseId IS NOT NULL
        """, nativeQuery = true)
    List<Long> findCourseIdsByMemberIdAndStartTimeBetween(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
