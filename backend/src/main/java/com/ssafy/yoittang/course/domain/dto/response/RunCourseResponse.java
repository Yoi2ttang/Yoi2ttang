package com.ssafy.yoittang.course.domain.dto.response;

public record RunCourseResponse(
        Long courseId,
        String courseName,
        float distance,
        String courseImageUrl,
        Integer completeRate
) {
}
