package com.ssafy.yoittang.course.domain.repository;

import static com.ssafy.yoittang.course.domain.QCourse.course;
import static com.ssafy.yoittang.course.domain.QCourseBookmark.courseBookmark;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CourseQueryRepositoryImpl implements CourseQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<CourseSummaryResponse> findBookmarkedCoursesByMemberId(Long memberId) {
        return jpaQueryFactory
                .select(Projections.constructor(
                        CourseSummaryResponse.class,
                        course.courseId,
                        course.courseName,
                        course.distance,
                        course.courseImageUrl
                ))
                .from(courseBookmark)
                .join(course).on(courseBookmark.courseId.eq(courseBookmark.courseId))
                .where(courseBookmark.memberId.eq(memberId))
                .fetch();
    }
}
