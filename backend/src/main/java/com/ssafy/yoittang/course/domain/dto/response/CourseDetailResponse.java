package com.ssafy.yoittang.course.domain.dto.response;

public record CourseDetailResponse(
        Long courseId,
        String courseName,
        float distance,
        String courseImageUrl,
        Integer calories,
        Integer times
) {
}
