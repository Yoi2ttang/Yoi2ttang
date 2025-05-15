package com.ssafy.yoittang.course.domain.repository;

import static com.ssafy.yoittang.course.domain.QCourse.course;
import static com.ssafy.yoittang.course.domain.QCourseBookmark.courseBookmark;
import static com.ssafy.yoittang.member.domain.QMember.member;
import static com.ssafy.yoittang.running.domain.QRunning.running;
import static com.ssafy.yoittang.runningpoint.domain.QRunningPoint.runningPoint;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.course.domain.Course;
import com.ssafy.yoittang.course.domain.dto.response.CourseClearMemberResponse;
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
                .orderBy(course.courseId.desc());

        if (limit != null) {
            query.limit(limit);
        }

        return query.fetch();
    }

    @Override
    public List<Course> findCompletedCoursesByMemberId(Long memberId, String pageToken, int pageSize) {
        return jpaQueryFactory
                .selectFrom(course)
                .join(running).on(course.courseId.eq(running.courseId))
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        course.courseId.isNotNull(),
                        isInRange(pageToken)
                )
                .distinct()
                .orderBy(course.courseId.desc())
                .limit(pageSize + 1)
                .fetch();
    }

    @Override
    public List<CourseSummaryResponse> findBookmarkedCoursesByMemberId(Long memberId, Integer limit) {
        JPAQuery<CourseSummaryResponse> query = jpaQueryFactory
                .select(Projections.constructor(
                        CourseSummaryResponse.class,
                        course.courseId,
                        course.courseName,
                        course.distance,
                        course.courseImageUrl
                ))
                .from(courseBookmark)
                .join(course).on(course.courseId.eq(courseBookmark.courseId))
                .where(courseBookmark.memberId.eq(memberId));

        Optional.ofNullable(limit).ifPresent(query::limit);
        return query.fetch();
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
        var runningDate = Expressions.dateTemplate(LocalDate.class, "cast({0} as date)", running.endTime);

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
                        running.endTime.goe(startDate),
                        running.endTime.lt(endDate)
                )
                .groupBy(runningDate)
                .fetch();
    }

    @Override
    public List<CourseClearMemberResponse> findClearedMembersByCourseId(
            Long courseId,
            String pageToken,
            int pageSize
    ) {
        return jpaQueryFactory
                .select(
                        Projections.constructor(
                                CourseClearMemberResponse.class,
                                member.memberId,
                                member.nickname,
                                member.profileImageUrl
                        )
                )
                .from(member)
                .join(running).on(member.memberId.eq(running.memberId))
                .where(isInRange(pageToken),
                        running.courseId.eq(courseId),
                        running.state.eq(State.COMPLETE)
                )
                .orderBy(member.memberId.asc())
                .limit(pageSize + 1)
                .fetch();
    }

    @Override
    public List<CourseSummaryResponse> findCompleteCoursesByMemberIdAndKeyword(String keyword, Long memberId) {
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
                .from(running)
                .join(course).on(running.courseId.eq(course.courseId))
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        keywordContains(keyword)
                )
                .fetch();
    }

    @Override
    public float sumDistancesByCourseIds(List<Long> courseIds) {
        Float sum = jpaQueryFactory
                .select(course.distance.sum())
                .from(course)
                .where(course.courseId.in(courseIds))
                .fetchOne();

        return sum != null ? sum : 0;
    }

    @Override
    public List<CourseSummaryResponse> findNearbyCoursesWithinDistance(
            double latitude,
            double longitude,
            double radiusKm,
            double minDistance,
            double maxDistance
    ) {
        return jpaQueryFactory
                .select(Projections.constructor(
                        CourseSummaryResponse.class,
                        course.courseId,
                        course.courseName,
                        course.distance,
                        course.courseImageUrl
                ))
                .from(runningPoint)
                .join(course).on(runningPoint.courseId.eq(course.courseId))
                .where(
                        course.distance.between(minDistance, maxDistance),
                        runningPoint.route.isNotNull(),
                        Expressions.booleanTemplate(
                                "ST_DistanceSphere({0}, ST_MakePoint({1}, {2})) <= {3}",
                                runningPoint.route,
                                longitude,
                                latitude,
                                radiusKm * 1000
                        )
                )
                .distinct()
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
        return member.memberId.gt(Long.valueOf(pageToken));
    }
}
