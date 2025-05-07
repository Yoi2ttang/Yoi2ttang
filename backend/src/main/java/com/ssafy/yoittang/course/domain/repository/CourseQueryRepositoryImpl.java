package com.ssafy.yoittang.course.domain.repository;

import static com.ssafy.yoittang.course.domain.QCourse.course;
import static com.ssafy.yoittang.course.domain.QCourseBookmark.courseBookmark;
import static com.ssafy.yoittang.member.domain.QMember.member;
import static com.ssafy.yoittang.running.domain.QRunning.running;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.course.domain.dto.response.CourseClearMemberResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseDetailResponse;
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
                                runningDate.as("date"),
                                running.count().intValue().as("completeCourseCount")
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
    public CourseDetailResponse findCourseByCourseId(Long courseId) {
        return jpaQueryFactory
                .select(
                        Projections.constructor(
                                CourseDetailResponse.class,
                                course.courseId,
                                course.courseName,
                                course.distance,
                                course.courseImageUrl,
                                Expressions.constant(30), //현재는 칼로리와 소요 시간 static 값으로 고정 추후 프런트와 협의 후 수정 예정
                                Expressions.constant(75)
                        )
                )
                .from(course)
                .where(course.courseId.eq(courseId))
                .fetchOne();

    }

    @Override
    public List<CourseClearMemberResponse> findClearedMembersByCourseId(Long courseId, String pageToken, int pageSize) {
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

    private BooleanExpression isInRange(String pageToken) {
        if (pageToken == null) {
            return null;
        }
        return member.memberId.gt(Long.valueOf(pageToken));
    }
}
