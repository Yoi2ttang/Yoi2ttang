package com.ssafy.yoittang.course.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.yoittang.course.domain.CourseBookmark;



public interface CourseBookmarkJpaRepository extends JpaRepository<CourseBookmark, Long> {
    Optional<CourseBookmark> findBookmarkByMemberIdAndCourseId(Long memberId, Long courseId);
}
