package com.ssafy.yoittang.course.domain.repository;

import java.util.List;

import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;

public interface CourseQueryRepository {
    List<CourseSummaryResponse> findBookmarkedCoursesByMemberId(Long memberId);
}
