package com.ssafy.yoittang.tile.domain;

import static com.ssafy.yoittang.course.domain.QCourseTile.courseTile;
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
    public List<TileGetResponse> getTile(Long zodiacId, String geohash) {
        return queryFactory.select(
                Projections.constructor(
                        TileGetResponse.class,
                        tile.geoHash,
                        tile.zodiacId,
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
                        eqZodiacId(zodiacId)
                )
                .fetch();
    }

    private BooleanExpression eqZodiacId(Long zodiacId) {
        if (Objects.isNull(zodiacId)) {
            return null;
        }
        return tile.zodiacId.eq(zodiacId);
    }

    @Override
    public List<TileClusterGetResponse> getTileCluster(
            Long zodiacId,
            String geoHashString
    ) {
        return queryFactory.select(
                Projections.constructor(
                        TileClusterGetResponse.class,
                        tile.zodiacId,
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
                                .and(tile.zodiacId.isNotNull()),
                        eqZodiacId(zodiacId)
                )
                .groupBy(tile.zodiacId)
                .fetch();
    }

    @Override
    public List<TileGetResponse> getTileByCourseId(Long courseId, String geohash) {
        return queryFactory.select(
                        Projections.constructor(
                                TileGetResponse.class,
                                tile.geoHash,
                                Expressions.template(Long.class, "null"),
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
                .distinct()
                .from(courseTile)
                .leftJoin(tile).on(courseTile.courseId.eq(courseId), courseTile.geoHash.eq(tile.geoHash))
                .where(
                        courseTile.geoHash.like(geohash)
                )
                .fetch();
    }

    @Override
    public List<TileGetResponse> getTilesInGeoHashes(List<String> geoHashList) {
        return queryFactory.select(
                        Projections.constructor(
                                TileGetResponse.class,
                                tile.geoHash,
                                Expressions.template(Long.class, "null"),
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
                        tile.geoHash.in(geoHashList)
                )
                .fetch();
    }
}
