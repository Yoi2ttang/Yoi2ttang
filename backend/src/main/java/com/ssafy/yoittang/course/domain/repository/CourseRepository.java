package com.ssafy.yoittang.course.domain.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.course.domain.Course;
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

    public List<Course> findCompletedCoursesByMemberId(Long memberId, Integer limit) {
        return courseQueryRepository.findCompletedCoursesByMemberId(memberId, limit);
    }

    public PageInfo<Course> findPagedCompletedCoursesByMemberId(Long memberId, String keyword, String pageToken) {
        var data = courseQueryRepository.findPagedCompletedCoursesByMemberId(
                memberId,
                keyword,
                pageToken,
                DEFAULT_PAGE_SIZE
        );

        return PageInfo.of(data, DEFAULT_PAGE_SIZE, Course::getCourseId);
    }

    public List<CourseSummaryResponse> findBookmarkedCoursesByMemberId(Long memberId, Integer limit) {
        return courseQueryRepository.findBookmarkedCoursesByMemberId(memberId, limit);
    }

    public PageInfo<CourseSummaryResponse> findPageBookmarkedCoursesByMemberId(
            Long memberId,
            String keyword,
            String pageToken
    ) {
        var data = courseQueryRepository.findPageBookmarkedCoursesByMemberId(
                memberId,
                keyword,
                pageToken,
                DEFAULT_PAGE_SIZE
        );
        return PageInfo.of(data, DEFAULT_PAGE_SIZE, CourseSummaryResponse::courseId);
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

    public PageInfo<CourseSummaryResponse> findCourseByKeyword(String keyword, String pageToken) {
        var data = courseQueryRepository.findCourseByKeyword(
                keyword,
                pageToken,
                DEFAULT_PAGE_SIZE
        );
        return PageInfo.of(data, DEFAULT_PAGE_SIZE, CourseSummaryResponse::courseId);
    }

    public List<CourseSummaryResponse> findRandomCourses(int limit) {
        return courseQueryRepository.findRandomCourses(limit);
    }
}
