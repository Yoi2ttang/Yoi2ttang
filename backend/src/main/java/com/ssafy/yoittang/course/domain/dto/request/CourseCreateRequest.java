package com.ssafy.yoittang.course.domain.dto.request;

import java.util.List;

public record CourseCreateRequest(
        String courseName,
        Float distance,
        List<Double[]> points
) {
}
