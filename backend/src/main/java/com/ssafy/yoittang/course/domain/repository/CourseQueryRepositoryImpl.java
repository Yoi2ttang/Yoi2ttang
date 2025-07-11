package com.ssafy.yoittang.course.domain.repository;

import static com.ssafy.yoittang.course.domain.QCourse.course;
import static com.ssafy.yoittang.course.domain.QCourseBookmark.courseBookmark;
import static com.ssafy.yoittang.running.domain.QRunning.running;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.course.domain.Course;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.CoursePointResponse;
import com.ssafy.yoittang.running.domain.State;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CourseQueryRepositoryImpl implements CourseQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Course> findCompletedCoursesByMemberId(Long memberId, Integer limit) {
        JPAQuery<Course> query = jpaQueryFactory
                .selectFrom(course)
                .join(running).on(course.courseId.eq(running.courseId))
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        course.courseId.isNotNull()
                )
                .distinct()
                .orderBy(course.courseId.asc());

        if (limit != null) {
            query.limit(limit);
        }

        return query.fetch();
    }

    @Override
    public List<Course> findPagedCompletedCoursesByMemberId(
            Long memberId,
            String keyword,
            String pageToken,
            int pageSize
    ) {
        return jpaQueryFactory
                .selectFrom(course)
                .join(running).on(course.courseId.eq(running.courseId))
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        course.courseId.isNotNull(),
                        isInRange(pageToken),
                        keywordContains(keyword)
                )
                .orderBy(course.courseId.asc())
                .limit(pageSize + 1)
                .fetch();
    }

    @Override
    public List<CourseSummaryResponse> findBookmarkedCoursesByMemberId(Long memberId, Integer limit) {
        return jpaQueryFactory
                .select(Projections.constructor(
                        CourseSummaryResponse.class,
                        course.courseId,
                        course.courseName,
                        course.distance,
                        course.courseImageUrl
                ))
                .from(courseBookmark)
                .join(course).on(course.courseId.eq(courseBookmark.courseId))
                .where(
                        courseBookmark.memberId.eq(memberId),
                        courseBookmark.isActive.eq(true)
                )
                .orderBy(course.courseId.asc())
                .limit(limit)
                .fetch();
    }

    @Override
    public List<CourseSummaryResponse> findPageBookmarkedCoursesByMemberId(
            Long memberId,
            String keyword,
            String pageToken,
            int pageSize
    ) {
        return jpaQueryFactory
                .select(Projections.constructor(
                        CourseSummaryResponse.class,
                        course.courseId,
                        course.courseName,
                        course.distance,
                        course.courseImageUrl
                ))
                .from(courseBookmark)
                .join(course).on(course.courseId.eq(courseBookmark.courseId))
                .where(
                        courseBookmark.memberId.eq(memberId),
                        courseBookmark.isActive.eq(true),
                        isInRange(pageToken),
                        keywordContains(keyword)

                )
                .orderBy(course.courseId.asc())
                .limit(pageSize + 1)
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
    public CourseSummaryResponse findCourseByCourseId(Long courseId) {
        return jpaQueryFactory
                .select(Projections.constructor(
                        CourseSummaryResponse.class,
                        course.courseId,
                        course.courseName,
                        course.distance,
                        course.courseImageUrl
                ))
                .from(course)
                .where(course.courseId.eq(courseId))
                .fetchOne();
    }

    @Override
    public List<CoursePointResponse> findDailyCompletedCourseCountsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        var runningDate = Expressions.dateTemplate(LocalDate.class, "cast({0} as date)", running.startTime);

        return jpaQueryFactory
                .select(
                        Projections.constructor(
                                CoursePointResponse.class,
                                runningDate.as("time"),
                                running.count().intValue().as("count")
                        )
                )
                .from(running)
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        running.courseId.isNotNull(),
                        running.endTime.isNotNull(),
                        running.startTime.goe(startDate),
                        running.startTime.lt(endDate)
                )
                .groupBy(runningDate)
                .fetch();
    }

    @Override
    public List<CourseSummaryResponse> findCourseByKeyword(String keyword, String pageToken, int pageSize) {
        return jpaQueryFactory
                .select(
                        Projections.constructor(
                                CourseSummaryResponse.class,
                                course.courseId,
                                course.courseName,
                                course.distance,
                                course.courseImageUrl
                        )
                )
                .from(course)
                .where(isInRange(pageToken),
                        keywordContains(keyword)
                )
                .orderBy(course.courseId.asc())
                .limit(pageSize + 1)
                .fetch();
    }

    @Override
    public List<CourseSummaryResponse> findRandomCourses(int limit) {
        return jpaQueryFactory
                .select(
                        Projections.constructor(
                                CourseSummaryResponse.class,
                                course.courseId,
                                course.courseName,
                                course.distance,
                                course.courseImageUrl
                        )
                )
                .from(course)
                .orderBy(Expressions.numberTemplate(Double.class, "random()").asc())
                .limit(limit)
                .fetch();
    }

    private BooleanExpression keywordContains(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return null;
        }
        return course.courseName.startsWithIgnoreCase(keyword);
    }

    private BooleanExpression isInRange(String pageToken) {
        if (pageToken == null) {
            return null;
        }
        return course.courseId.gt(Long.valueOf(pageToken));
    }

    private BooleanExpression isInDescRange(String pageToken) {
        if (pageToken == null) {
            return null;
        }
        return course.courseId.lt(Long.valueOf(pageToken));
    }
}
