package com.ssafy.yoittang.course.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.yoittang.course.domain.Course;


public interface CourseJpaRepositoy extends JpaRepository<Course, Long>, CourseQueryRepository {
    long countByCourseIdIn(List<Long> courseIds);
}
