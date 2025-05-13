package com.ssafy.yoittang.dashboard.domain.dto.response;

import java.util.List;

import lombok.Builder;

@Builder
public record MemberCoursePoints(
        List<CoursePointResponse> pointList
) { }
