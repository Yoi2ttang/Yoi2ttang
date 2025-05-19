package com.ssafy.yoittang.running.domain;

import static com.ssafy.yoittang.member.domain.QMember.member;
import static com.ssafy.yoittang.running.domain.QRunning.running;
import static com.ssafy.yoittang.runningpoint.domain.QRunningPoint.runningPoint;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.dashboard.domain.dto.response.DateAndSeconds;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RunningQueryRepositoryImpl implements RunningQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<DateAndSeconds> findDailyRunningSecondsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        List<Tuple> tuples = jpaQueryFactory
                .select(
                        Expressions.dateTemplate(LocalDate.class, "DATE({0})", runningPoint.arrivalTime),
                        Expressions.numberTemplate(Double.class,
                                "SUM(EXTRACT(EPOCH FROM {0}) - EXTRACT(EPOCH FROM {1}))",
                                running.endTime, running.startTime
                        )
                )
                .from(running)
                .join(runningPoint).on(running.runningId.eq(runningPoint.runningId))
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        runningPoint.arrivalTime.goe(startDate),
                        runningPoint.arrivalTime.lt(endDate)
                )
                .groupBy(Expressions.dateTemplate(LocalDate.class, "DATE({0})", runningPoint.arrivalTime))
                .orderBy(new OrderSpecifier<>(Order.ASC,
                        Expressions.dateTemplate(LocalDate.class, "DATE({0})", runningPoint.arrivalTime)))
                .fetch();

        return tuples.stream()
                .map(t -> new DateAndSeconds(
                        t.get(0, java.sql.Date.class).toLocalDate(),
                        t.get(1, Double.class)
                ))
                .toList();


    }

    @Override
    public List<Long> findPagedClearedMemberIdsByCourseId(Long courseId, String pageToken, int pageSize) {
        return jpaQueryFactory
                .select(running.memberId)
                .distinct()
                .from(running)
                .where(
                        running.courseId.eq(courseId),
                        running.state.eq(State.COMPLETE),
                        running.memberId.isNotNull(),
                        isInRange(pageToken)
                )
                .orderBy(running.endTime.desc())
                .limit(pageSize + 1)
                .fetch();
    }

    private BooleanExpression isInRange(String pageToken) {
        if (pageToken == null) {
            return null;
        }
        LocalDateTime endTimeToken = LocalDateTime.parse(pageToken); // ISO 형식 가정
        return running.endTime.lt(endTimeToken);
    }

}
