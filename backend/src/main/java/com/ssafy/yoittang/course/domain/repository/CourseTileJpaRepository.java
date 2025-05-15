package com.ssafy.yoittang.course.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.yoittang.course.domain.CourseTile;

public interface CourseTileJpaRepository extends JpaRepository<CourseTile, Long>, CourseTileJdbcRepository {

    @Query("SELECT c.geoHash FROM CourseTile c WHERE c.courseId = :courseId AND c.geoHash LIKE :geoHashString")
    List<String> findGeoHashesByCourseIdAndGeoHashPrefix(
            @Param("courseId") Long courseId,
            @Param("geoHashString") String geoHashString
    );
}
