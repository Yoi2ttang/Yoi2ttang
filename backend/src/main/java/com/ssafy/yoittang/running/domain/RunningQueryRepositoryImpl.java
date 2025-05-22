package com.ssafy.yoittang.running.domain;

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
                        Expressions.dateTemplate(LocalDate.class, "DATE({0})", running.startTime),
                        Expressions.numberTemplate(Double.class,
                                "SUM(EXTRACT(EPOCH FROM {0}) - EXTRACT(EPOCH FROM {1}))",
                                running.endTime, running.startTime
                        )
                )
                .from(running)
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        running.startTime.goe(startDate),
                        running.startTime.lt(endDate)
                )
                .groupBy(Expressions.dateTemplate(LocalDate.class, "DATE({0})", running.startTime))
                .orderBy(new OrderSpecifier<>(Order.ASC,
                        Expressions.dateTemplate(LocalDate.class, "DATE({0})", running.startTime)))
                .fetch();

        return tuples.stream()
                .map(t -> new DateAndSeconds(
                        t.get(0, java.sql.Date.class).toLocalDate(),
                        t.get(1, Double.class)
                ))
                .toList();


    }

    @Override
    public List<Long> findMemberIdsByCourseId(Long courseId) {
        List<Tuple> results = jpaQueryFactory
                .select(running.memberId, running.endTime)
                .distinct()
                .from(running)
                .where(
                        running.courseId.eq(courseId),
                        running.state.eq(State.COMPLETE),
                        running.memberId.isNotNull()
                )
                .orderBy(running.endTime.desc())
                .limit(10)
                .fetch();

        return results.stream()
                .map(tuple -> tuple.get(running.memberId))
                .distinct()
                .toList();
    }

    @Override
    public List<Long> findPagedClearedMemberIdsByCourseId(Long courseId, String pageToken, int pageSize) {
        List<Tuple> tuples = jpaQueryFactory
                .select(running.memberId, running.endTime)
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

        return tuples.stream()
                .map(t -> t.get(running.memberId)) // memberId만 추출
                .distinct()                         // Java단에서 중복 제거
                .toList();
    }

    private BooleanExpression isInRange(String pageToken) {
        if (pageToken == null) {
            return null;
        }
        LocalDateTime endTimeToken = LocalDateTime.parse(pageToken); // ISO 형식 가정
        return running.endTime.lt(endTimeToken);
    }

}
