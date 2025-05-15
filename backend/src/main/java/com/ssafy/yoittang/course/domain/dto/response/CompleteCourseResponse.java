package com.ssafy.yoittang.course.domain.dto.response;

import java.time.LocalDateTime;

public record CompleteCourseResponse(
        Long courseId,
        String courseName,
        float distance,
        String courseImageUrl,
        LocalDateTime endTime
) {
}
