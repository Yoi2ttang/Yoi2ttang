package com.ssafy.yoittang.course.domain.repository;

import java.util.List;

import com.ssafy.yoittang.course.domain.Location;

public interface LocationJdbcRepository {
    void bulkInsert(List<Location> locations);
}
