package com.ssafy.yoittang.tilehistory.domain.query;

import static com.ssafy.yoittang.course.domain.QCourseTile.courseTile;
import static com.ssafy.yoittang.running.domain.QRunning.running;
import static com.ssafy.yoittang.runningpoint.domain.QRunningPoint.runningPoint;
import static com.ssafy.yoittang.tile.domain.QTile.tile;
import static com.ssafy.yoittang.tilehistory.domain.jpa.QTileHistoryJpa.tileHistoryJpa;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyTileResponse;
import com.ssafy.yoittang.running.domain.State;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.request.PersonalTileGetRequest;
import com.ssafy.yoittang.tile.domain.response.PersonalTileGetResponse;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TileHistoryQueryRepositoryImpl implements TileHistoryQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<PersonalTileGetResponse> getTileHistoryWithQuery(
            PersonalTileGetRequest personalTileGetRequest,
            String geoHashString
    ) {

        return queryFactory.select(
                Projections.constructor(
                        PersonalTileGetResponse.class,
                        tileHistoryJpa.geoHash,
                        Projections.constructor(
                                GeoPoint.class,
                                tile.latSouth,
                                tile.lngWest
                        ),
                        Projections.constructor(
                                GeoPoint.class,
                                tile.latNorth,
                                tile.lngEast
                        )

                )
        )
                .from(tileHistoryJpa)
                .leftJoin(runningPoint).on(runningPoint.runningPointId.eq(tileHistoryJpa.runningPointId))
                .leftJoin(tile).on(tile.geoHash.eq(tileHistoryJpa.geoHash))
                .where(
                        tileHistoryJpa.memberId.eq(personalTileGetRequest.memberId()),
                        likeGeoHashString(geoHashString),
                        runningPoint.arrivalTime.between(personalTileGetRequest.localDate().atStartOfDay(),
                                personalTileGetRequest.localDate().atTime(23, 59, 59))
                )
                .fetch();
    }

    @Override
    public int countDistinctGeohashLastMonth(Long memberId, LocalDateTime startDate, LocalDateTime endDate) {
        Long count = queryFactory
                .select(tileHistoryJpa.geoHash.countDistinct())
                .from(tileHistoryJpa)
                .join(runningPoint).on(tileHistoryJpa.runningPointId.eq(runningPoint.runningId))
                .where(
                        tileHistoryJpa.memberId.eq(memberId),
                        runningPoint.arrivalTime.goe(startDate),
                        runningPoint.arrivalTime.lt(endDate)
                )
                .fetchOne();
        return count != null ? count.intValue() : 0;
    }

    @Override
    public List<MemberDailyTileResponse> findDailyTileCountsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        var arrivalDate = Expressions.dateTemplate(LocalDate.class, "cast({0} as date)", runningPoint.arrivalTime);
        return queryFactory
                .select(Projections.constructor(
                        MemberDailyTileResponse.class,
                        arrivalDate,
                        tileHistoryJpa.geoHash.countDistinct().castToNum(Integer.class)
                ))
                .from(tileHistoryJpa)
                .join(runningPoint).on(tileHistoryJpa.runningPointId.eq(runningPoint.runningPointId))
                .where(
                        tileHistoryJpa.memberId.eq(memberId),
                        runningPoint.arrivalTime.goe(startDate),
                        runningPoint.arrivalTime.lt(endDate)
                )
                .groupBy(arrivalDate)
                .fetch();
    }

    @Override
    public Map<Long, Long> countVisitedCourseTilesByMember(Long memberId, List<Long> courseIds) {

        List<Tuple> results = queryFactory
                .select(running.courseId, tileHistoryJpa.geoHash.countDistinct())
                .from(running)
                .join(runningPoint).on(running.runningId.eq(runningPoint.runningId))
                .join(tileHistoryJpa).on(tileHistoryJpa.runningPointId.eq(runningPoint.runningPointId))
                .join(courseTile).on(
                        courseTile.courseId.eq(running.courseId)
                                .and(courseTile.geoHash.eq(tileHistoryJpa.geoHash))
                )
                .where(
                        running.memberId.eq(memberId),
                        running.state.eq(State.COMPLETE),
                        running.courseId.in(courseIds)
                )
                .groupBy(running.courseId)
                .fetch();

        return results.stream()
                .collect(Collectors.toMap(
                        tuple -> tuple.get(running.courseId),
                        tuple -> Optional.ofNullable(tuple.get(tileHistoryJpa.geoHash.countDistinct())).orElse(0L)
                ));

    }

    @Override
    public Map<Long, Long> countVisitedTilesByCourseAndMember(Long courseId, List<Long> memberIds) {
        List<Tuple> results = queryFactory
                .select(tileHistoryJpa.memberId, tileHistoryJpa.geoHash.countDistinct())
                .from(running)
                .join(runningPoint).on(running.runningId.eq(runningPoint.runningId))
                .join(tileHistoryJpa).on(tileHistoryJpa.runningPointId.eq(runningPoint.runningPointId))
                .join(courseTile).on(courseTile.geoHash.eq(tileHistoryJpa.geoHash)
                        .and(courseTile.courseId.eq(courseId)))
                .where(
                        running.courseId.eq(courseId),
                        running.state.eq(State.COMPLETE),
                        running.memberId.in(memberIds)
                )
                .groupBy(tileHistoryJpa.memberId)
                .fetch();

        return results.stream()
                .collect(Collectors.toMap(
                        tuple -> tuple.get(tileHistoryJpa.memberId),
                        tuple -> Optional.ofNullable(tuple.get(tileHistoryJpa.geoHash.countDistinct())).orElse(0L)
                ));
    }

    private BooleanExpression likeGeoHashString(String geoHashString) {
        if (Objects.isNull(geoHashString)) {
            return null;
        }
        return tile.geoHash.like(geoHashString + "%");
    }
}
