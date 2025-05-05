package com.ssafy.yoittang.course.domain.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyCompleteCourseResponse;

public interface CourseQueryRepository {
    List<CourseSummaryResponse> findBookmarkedCoursesByMemberId(Long memberId);

    List<CourseSummaryResponse> findCompleteCoursesByMemberId(Long memberId);

    List<MemberDailyCompleteCourseResponse> findDailyCompletedCourseCountsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}
