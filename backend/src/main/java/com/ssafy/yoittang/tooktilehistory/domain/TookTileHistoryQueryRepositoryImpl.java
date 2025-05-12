package com.ssafy.yoittang.tooktilehistory.domain;

import static com.ssafy.yoittang.tooktilehistory.domain.QTookTileHistory.tookTileHistory;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.DateExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.tooktilehistory.domain.dto.response.TookTileHistoryGroupByPeriod;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TookTileHistoryQueryRepositoryImpl implements TookTileHistoryQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<TookTileHistoryGroupByPeriod> getTookTileHistoryGroupByPeriod(
            Long zodiacId,
            LocalDate startDate,
            LocalDate endDate,
            Period period,
            Order order
    ) {

        DateExpression<LocalDate> periodExpression =  Expressions.dateTemplate(
                LocalDate.class,
                "DATE_TRUNC({0}, {1})",
                checkPeriod(period),
                tookTileHistory.tookDate
        );

        return queryFactory.select(
                Projections.constructor(
                        TookTileHistoryGroupByPeriod.class,
                        tookTileHistory.tookTileHistoryId.count(),
                        periodExpression
                )
        )
                .from(tookTileHistory)
                .where(
                        eqZodiacId(zodiacId),
                        tookTileHistory.tookDate.between(startDate, endDate)
                )
                .groupBy(tookTileHistory.tookDate)
                .orderBy(orderDate(periodExpression, order))
                .fetch();
    }

    String checkPeriod(Period period) {
        if (Objects.isNull(period)) {
            return Period.DAY.toString();
        }
        return  period.toString();
    }

    BooleanExpression eqZodiacId(Long zodiacId) {
        if (Objects.isNull(zodiacId)) {
            return null;
        }
        return tookTileHistory.zodiacId.eq(zodiacId);
    }

    OrderSpecifier<LocalDate> orderDate(DateExpression<LocalDate> periodExpression, Order order) {
        if (Objects.isNull(order) || order.equals(Order.ASC)) {
            return periodExpression.asc();
        }
        return periodExpression.desc();
    }

}
