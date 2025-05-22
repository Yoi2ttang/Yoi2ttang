package com.ssafy.yoittang.course.domain.repository;

import java.util.List;
import java.util.Map;

public interface CourseTileQueryRepository {
    Map<Long, Long> countCourseTileByCourseIds(List<Long> courseIds);

    Long countCourseTileByCourseId(Long courseId);
}
