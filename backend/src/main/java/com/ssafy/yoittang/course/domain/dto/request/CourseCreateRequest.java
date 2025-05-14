package com.ssafy.yoittang.course.domain.dto.request;

import java.util.List;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;

public record CourseCreateRequest(
        String courseName,
        List<GeoPoint> geoPoints,
        Float distance
) {
}
