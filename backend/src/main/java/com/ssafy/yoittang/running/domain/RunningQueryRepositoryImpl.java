package com.ssafy.yoittang.running.domain;

import static com.ssafy.yoittang.running.domain.QRunning.running;
import static com.ssafy.yoittang.runningpoint.domain.QRunningPoint.runningPoint;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
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
        var arrivalDate = Expressions.dateTemplate(LocalDate.class, "cast({0} as date)", runningPoint.arrivalTime);
        var arrivalDateAsc = new OrderSpecifier<>(Order.ASC, arrivalDate);

        return jpaQueryFactory
                .select(
                        Projections.constructor(
                                DateAndSeconds.class,
                                arrivalDate,
                                Expressions.numberTemplate(
                                        Double.class,
                                        "SUM(EXTRACT(EPOCH FROM ({0} - {1})))",
                                        running.endTime,
                                        running.startTime
                                )
                        )
                )
                .from(running)
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        runningPoint.arrivalTime.goe(startDate),
                        runningPoint.arrivalTime.lt(endDate)
                )
                .groupBy(arrivalDate)
                .orderBy(arrivalDateAsc)
                .fetch();

    }
}
