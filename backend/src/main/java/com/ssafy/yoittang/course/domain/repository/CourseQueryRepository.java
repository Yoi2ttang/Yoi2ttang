package com.ssafy.yoittang.course.domain.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.yoittang.course.domain.Course;
import com.ssafy.yoittang.course.domain.dto.response.CourseClearMemberResponse;
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

    List<CourseClearMemberResponse> findClearedMembersByCourseId(
            Long courseId,
            String pageToken,
            int pageSize
    );

    List<CourseSummaryResponse> findCompleteCoursesByMemberIdAndKeyword(String keyword, Long memberId);

    float sumDistancesByCourseIds(List<Long> courseIds);

    List<CourseSummaryResponse> findNearbyCoursesWithinDistance(
            double latitude,
            double longitude,
            double radiusKm,
            double minDistance,
            double maxDistance
    );

    List<CourseSummaryResponse> findCourseByKeyword(
            String keyword,
            String pageToken,
            int pageSize
    );
}
