package com.ssafy.yoittang.course.domain.dto.response;

public record CourseSummaryResponse(
        Long courseId,
        String courseName,
        float distance,
        String courseImageUrl
) {
}
