package com.ssafy.yoittang.course.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.yoittang.course.domain.CourseTile;

public interface CourseTileJpaRepository extends JpaRepository<CourseTile, Long>, CourseTileJdbcRepository {
}
