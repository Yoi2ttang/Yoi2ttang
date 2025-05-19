package com.ssafy.yoittang.course.domain.dto.response;

public record CourseDetailResponse(
        Long courseId,
        String courseName,
        float distance,
        boolean isMark,
        String courseImageUrl,
        Integer calories,
        Integer times
) {
}
