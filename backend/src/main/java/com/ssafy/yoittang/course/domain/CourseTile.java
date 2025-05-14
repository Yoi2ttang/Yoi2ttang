package com.ssafy.yoittang.course.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "course_tiles")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CourseTile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_tile_id")
    private Long courseTileId;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(name = "geohash", nullable = false)
    private String geoHash;

    @Builder
    private CourseTile(
            Long courseId,
            String geoHash
    ) {
        this.courseId = courseId;
        this.geoHash = geoHash;
    }
}
