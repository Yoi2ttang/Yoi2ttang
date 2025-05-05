package com.ssafy.yoittang.course.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.yoittang.course.domain.Location;

public interface LocationJpaRepository extends JpaRepository<Location, Long>, LocationJdbcRepository {
}
