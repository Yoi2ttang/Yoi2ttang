package com.ssafy.yoittang.course.domain.repository;

import static com.ssafy.yoittang.course.domain.QCourse.course;
import static com.ssafy.yoittang.course.domain.QCourseBookmark.courseBookmark;
import static com.ssafy.yoittang.running.domain.QRunning.running;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyCompleteCourseResponse;
import com.ssafy.yoittang.running.domain.State;

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

    @Override
    public List<CourseSummaryResponse> findCompleteCoursesByMemberId(Long memberId) {
        return jpaQueryFactory
                .select(Projections.constructor(
                        CourseSummaryResponse.class,
                        course.courseId,
                        course.courseName,
                        course.distance,
                        course.courseImageUrl
                ))
                .from(running)
                .join(course).on(running.courseId.eq(course.courseId))
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE)
                )
                .fetch();
    }

    @Override
    public List<MemberDailyCompleteCourseResponse> findDailyCompletedCourseCountsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        var runningDate = Expressions.dateTemplate(LocalDate.class, "cast({0} as date)", running.endTime);

        return jpaQueryFactory
                .select(
                        Projections.constructor(
                                MemberDailyCompleteCourseResponse.class,
                                runningDate,
                                running.count()
                        )
                )
                .from(running)
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        running.courseId.isNotNull(),
                        running.endTime.isNotNull(),
                        running.endTime.goe(startDate),
                        running.endTime.lt(endDate)
                )
                .groupBy(runningDate)
                .fetch();
    }
}
