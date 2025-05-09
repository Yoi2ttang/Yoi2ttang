package com.ssafy.yoittang.course.domain.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.yoittang.course.domain.dto.response.CourseClearMemberResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseDetailResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyCompleteCourseResponse;

public interface CourseQueryRepository {
    List<CourseSummaryResponse> findBookmarkedCoursesByMemberId(Long memberId);

    List<CourseSummaryResponse> findCompleteCoursesByMemberId(Long memberId);

    CourseSummaryResponse findCourseByCourseId(Long courseId);

    List<MemberDailyCompleteCourseResponse> findDailyCompletedCourseCountsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    List<CourseClearMemberResponse> findClearedMembersByCourseId(
            Long courseId,
            String pageToken,
            int pageSize
    );
}
