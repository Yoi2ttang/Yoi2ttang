package com.ssafy.yoittang.course.domain.repository;

import java.util.List;

import com.ssafy.yoittang.course.domain.CourseTile;

public interface CourseTileJdbcRepository {
    void bulkInsert(List<CourseTile> courseTiles);
}
