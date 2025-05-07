package com.ssafy.yoittang.runningpoint.domain;

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
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyDistanceResponse;
import com.ssafy.yoittang.running.domain.State;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RunningPointQueryRepositoryImpl implements RunningPointQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public Double findTotalDistanceByMemberId(Long memberId) {
        return jpaQueryFactory
                .select(
                        Expressions.numberTemplate(Double.class,
                                "SUM(ST_Length({0}::geography))", runningPoint.root)
                )
                .from(runningPoint)
                .join(running).on(runningPoint.runningId.eq(running.runningId))
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE)
                )
                .fetchOne();
    }

    @Override
    public Double findLastMonthDistanceByMemberId(Long memberId, LocalDateTime startDate, LocalDateTime endDate) {
        return jpaQueryFactory
                .select(
                        Expressions.numberTemplate(Double.class,
                                "SUM(ST_Length({0}::geography))", runningPoint.root)
                )
                .from(runningPoint)
                .join(running).on(runningPoint.runningId.eq(running.runningId))
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        runningPoint.arrivalTime.goe(startDate),
                        runningPoint.arrivalTime.lt(endDate)
                )
                .fetchOne();
    }

    @Override
    public List<MemberDailyDistanceResponse> findDailyDistancesByPeriod(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        var arrivalDate = Expressions.dateTemplate(LocalDate.class, "cast({0} as date)", runningPoint.arrivalTime);
        var arrivalDateAsc = new OrderSpecifier<>(Order.ASC, arrivalDate);


        return jpaQueryFactory
                .select(
                        Projections.constructor(
                                MemberDailyDistanceResponse.class,
                                arrivalDate,
                                Expressions.numberTemplate(
                                        Double.class,
                                        "SUM(ST_Length({0}::geography))",
                                        Expressions.stringTemplate("{0}", runningPoint.root)
                                )
                        )

                )
                .from(runningPoint)
                .join(running).on(runningPoint.runningId.eq(running.runningId))
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
