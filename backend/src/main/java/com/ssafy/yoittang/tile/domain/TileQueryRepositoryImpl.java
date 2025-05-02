package com.ssafy.yoittang.tile.domain;

import static com.ssafy.yoittang.tile.domain.QTile.tile;

import java.util.List;
import java.util.Objects;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileTeamSituationResponse;

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

    @Override
    public List<TileTeamSituationResponse> getTileSituation(Long zodiacId) {
        NumberPath<Long> count = Expressions.numberPath(Long.class, "count");
        NumberPath<Integer> rank = Expressions.numberPath(Integer.class, "rank");

        return queryFactory.select(
                Projections.constructor(
                        TileTeamSituationResponse.class,
                        Expressions.numberTemplate(
                                Integer.class,
                                "RANK() OVER (ORDER BY COUNT(*) DESC)"
                        ).as(rank),
                        tile.zordiacId,
                        tile.zordiacId.count().as(count)
                )
        )
                .from(tile)
                .where(tile.zordiacId.isNotNull())
                .groupBy(tile.zordiacId)
                .orderBy(count.desc())
                .fetch();
    }


}
