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
@Table(name = "courses")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "course_name", length = 32, nullable = false)
    private String courseName;

    @Column(name = "distance", nullable = false)
    private float distance;

    @Column(name = "course_image_url", length = 256, nullable = false)
    private String courseImageUrl;

    @Builder
    private Course(
            Long memberId,
            String courseName,
            float distance,
            String courseImageUrl
    ) {
        this.memberId = memberId;
        this.courseName = courseName;
        this.distance = distance;
        this.courseImageUrl = courseImageUrl;
    }
}
