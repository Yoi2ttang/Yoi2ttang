package com.ssafy.yoittang.course.domain.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.course.domain.Course;
import com.ssafy.yoittang.course.domain.dto.response.CourseClearMemberResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.CoursePointResponse;


import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CourseRepository {

    private static final int DEFAULT_PAGE_SIZE = 10;

    private final CourseJpaRepositoy courseJpaRepositoy;
    private final CourseQueryRepository courseQueryRepository;

    public long countByCourseIdIn(List<Long> courseIds) {
        return courseJpaRepositoy.countByCourseIdIn(courseIds);
    }

    public List<CourseSummaryResponse> findBookmarkedCoursesByMemberId(Long memberId, Integer limit) {
        return courseQueryRepository.findBookmarkedCoursesByMemberId(memberId, limit);
    }

    public List<CourseSummaryResponse> findCompleteCoursesByMemberId(Long memberId) {
        return courseQueryRepository.findCompleteCoursesByMemberId(memberId);
    }

    public CourseSummaryResponse findCourseByCourseId(Long courseId) {
        return courseQueryRepository.findCourseByCourseId(courseId);
    }

    public List<CoursePointResponse> findDailyCompletedCourseCountsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        return courseQueryRepository.findDailyCompletedCourseCountsByMemberId(
                memberId,
                startDate,
                endDate
        );
    }

    public void save(Course course) {
        courseJpaRepositoy.save(course);
    }

    public PageInfo<CourseClearMemberResponse> findClearedMembersByCourseId(
            Long courseId,
            String pageToken
    ) {
        var data = courseQueryRepository.findClearedMembersByCourseId(
                courseId,
                pageToken,
                DEFAULT_PAGE_SIZE
        );
        return PageInfo.of(data, DEFAULT_PAGE_SIZE, CourseClearMemberResponse::memberId);
    }

    public List<CourseSummaryResponse> findCompleteCoursesByMemberIdAndKeyword(String keyword, Long memberId) {
        return courseQueryRepository.findCompleteCoursesByMemberIdAndKeyword(keyword, memberId);
    }

    public float sumDistancesByCourseIds(List<Long> courseIds) {
        return courseQueryRepository.sumDistancesByCourseIds(courseIds);
    }

    public List<CourseSummaryResponse> findNearbyCoursesWithinDistance(
            double latitude,
            double longitude,
            double radiusKm,
            double minDistance,
            double maxDistance
    ) {
        return courseQueryRepository.findNearbyCoursesWithinDistance(
                latitude,
                longitude,
                radiusKm,
                minDistance,
                maxDistance
        );
    }

    public PageInfo<CourseSummaryResponse> findCourseByKeyword(String keyword, String pageToken) {
        var data = courseQueryRepository.findCourseByKeyword(
                keyword,
                pageToken,
                DEFAULT_PAGE_SIZE
        );
        return PageInfo.of(data, DEFAULT_PAGE_SIZE, CourseSummaryResponse::courseId);
    }
}
