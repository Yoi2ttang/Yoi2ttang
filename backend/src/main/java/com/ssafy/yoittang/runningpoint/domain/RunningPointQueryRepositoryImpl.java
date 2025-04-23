package com.ssafy.yoittang.runningpoint.domain;

import static com.ssafy.yoittang.running.domain.QRunning.running;
import static com.ssafy.yoittang.runningpoint.domain.QRunningPoint.runningPoint;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.runningpoint.domain.dto.reseponse.TopRunningPointResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RunningPointQueryRepositoryImpl implements RunningPointQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public TopRunningPointResponse getTopRunningPointByRunningIdAndMemberId(Long runningId, Long memberId) {

        return queryFactory
                .select(
                        Projections.constructor(
                                TopRunningPointResponse.class,
                                runningPoint.sequence.max(),
                                runningPoint.root,
                                running.state
                        )
                )
                .from(runningPoint)
                .leftJoin(running).on(runningPoint.runningId.eq(running.runningId))
                .where(runningPoint.runningId.eq(runningId).and(running.memberId.eq(memberId)))
                .fetchOne();
    }
}
