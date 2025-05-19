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
@Table(name = "course_bookmarks")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CourseBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_bookmark_id")
    private Long courseBookmarkId;

    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Builder
    private CourseBookmark(
            Long memberId,
            Long courseId
    ) {
        this.memberId = memberId;
        this.courseId = courseId;
        this.isActive = true;
    }

    public void changeState() {
        this.isActive = !this.isActive;
    }
}
