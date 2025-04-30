package com.ssafy.yoittang.tilehistory.domain.query;

import static com.ssafy.yoittang.runningpoint.domain.QRunningPoint.runningPoint;
import static com.ssafy.yoittang.tile.domain.QTile.tile;
import static com.ssafy.yoittang.tilehistory.domain.jpa.QTileHistoryJpa.tileHistoryJpa;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
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

    private BooleanExpression likeGeoHashString(String geoHashString) {
        if (Objects.isNull(geoHashString)) {
            return null;
        }
        return tile.geoHash.like(geoHashString + "%");
    }
}
