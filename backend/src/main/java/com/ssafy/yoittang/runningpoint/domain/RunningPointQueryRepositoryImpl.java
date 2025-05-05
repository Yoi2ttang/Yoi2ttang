package com.ssafy.yoittang.runningpoint.domain;

import static com.ssafy.yoittang.running.domain.QRunning.running;
import static com.ssafy.yoittang.runningpoint.domain.QRunningPoint.runningPoint;

import java.time.LocalDateTime;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
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
}
