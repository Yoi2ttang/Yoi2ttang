package com.ssafy.yoittang.course.domain.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.yoittang.course.domain.Course;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.CoursePointResponse;

public interface CourseQueryRepository {

    List<Course> findCompletedCoursesByMemberId(Long memberId, Integer limit);

    List<Course> findPagedCompletedCoursesByMemberId(Long memberId, String keyword, String pageToken, int pageSize);

    List<CourseSummaryResponse> findBookmarkedCoursesByMemberId(Long memberId, Integer limit);

    List<CourseSummaryResponse> findPageBookmarkedCoursesByMemberId(
            Long memberId,
            String keyword,
            String pageToken,
            int pageSize
    );

    List<CourseSummaryResponse> findCompleteCoursesByMemberId(Long memberId);

    CourseSummaryResponse findCourseByCourseId(Long courseId);

    List<CoursePointResponse> findDailyCompletedCourseCountsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    List<CourseSummaryResponse> findCourseByKeyword(
            String keyword,
            String pageToken,
            int pageSize
    );

    List<CourseSummaryResponse> findRandomCourses(int limit);
}
