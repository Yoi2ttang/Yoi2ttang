package com.ssafy.yoittang.tile.domain;

import static com.ssafy.yoittang.tile.domain.QTile.tile;

import java.util.List;
import java.util.Objects;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileGetResponse;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class TileQueryRepositoryImpl implements TileQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<TileGetResponse> getTile(Long zordiacId, String geohash) {
        return queryFactory.select(
                Projections.constructor(
                        TileGetResponse.class,
                        tile.geoHash,
                        tile.zordiacId,
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
                .from(tile)
                .where(
                        tile.geoHash.like(geohash),
                        eqZordiacId(zordiacId)
                )
                .fetch();
    }

    private BooleanExpression eqZordiacId(Long zordiacId) {
        if (Objects.isNull(zordiacId)) {
            return null;
        }
        return tile.zordiacId.eq(zordiacId);
    }

    @Override
    public List<TileClusterGetResponse> getTileCluster(
            Long zordiacId,
            String geoHashString
    ) {
        return queryFactory.select(
                Projections.constructor(
                        TileClusterGetResponse.class,
                        tile.zordiacId,
                        Projections.constructor(
                                GeoPoint.class,
                                tile.latNorth.add(tile.latSouth).divide(2).avg(),
                                tile.lngEast.add(tile.lngWest).divide(2).avg()
                        ),
                        tile.count()
                )
        )
                .from(tile)
                .where(
                        tile.geoHash.startsWith(geoHashString)
                                .and(tile.zordiacId.isNotNull()),
                        eqZordiacId(zordiacId)
                )
                .groupBy(tile.zordiacId)
                .fetch();
    }


}
