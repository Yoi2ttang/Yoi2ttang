package com.ssafy.yoittang.tile.domain;

import static com.ssafy.yoittang.course.domain.QCourseTile.courseTile;
import static com.ssafy.yoittang.runningpoint.domain.QRunningPoint.runningPoint;
import static com.ssafy.yoittang.tile.domain.QTile.tile;
import static com.ssafy.yoittang.tilehistory.domain.jpa.QTileHistoryJpa.tileHistoryJpa;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.request.TwoGeoPoint;
import com.ssafy.yoittang.tile.domain.response.TileGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileMemberClusterGetResponse;

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

    public List<TileGetResponse> getTile(Long zodiacId, List<String> geohashLikeList) {
        if (geohashLikeList.isEmpty()) {
            return null;
        }

        BooleanBuilder builder = getGeoHashLikeBuilder(geohashLikeList);

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
                        eqZodiacId(zodiacId),
                        builder
                )
                .fetch();
    }

    @Override
    public List<TileGetResponse> getTile(TwoGeoPoint twoGeoPoint, Long zodiacId) {
        double swLon = twoGeoPoint.sw().lng();
        double swLat = twoGeoPoint.sw().lat();
        double neLon = twoGeoPoint.ne().lng();
        double neLat = twoGeoPoint.ne().lat();

        return queryFactory
                .select(Projections.constructor(
                        TileGetResponse.class,
                        tile.geoHash, tile.zodiacId,
                        Projections.constructor(GeoPoint.class, tile.latSouth, tile.lngWest),
                        Projections.constructor(GeoPoint.class, tile.latNorth, tile.lngEast)
                ))
                .from(tile)
                .where(
                        eqZodiacId(zodiacId),
                        Expressions.booleanTemplate(
                                "ST_Intersects({0}, ST_MakeEnvelope({1}, {2}, {3}, {4}, 4326))",
                                tile.geom,
                                swLon, swLat, neLon, neLat
                        )
                )
                .fetch();
    }

    private BooleanExpression eqZodiacId(Long zodiacId) {
        if (Objects.isNull(zodiacId)) {
            return null;
        }
        return tile.zodiacId.eq(zodiacId);
    }

    private BooleanBuilder getGeoHashLikeBuilder(List<String> geohashLikeList) {
        BooleanBuilder builder = new BooleanBuilder();

        for (String prefix : geohashLikeList) {
            builder.or(tile.geoHash.startsWith(prefix));
        }

        return builder;
    }

//    @Override
//    public List<TileClusterGetResponse> getTileCluster(
//            Long zodiacId,
//            String geoHashString
//    ) {
//        NumberExpression<Double> centerLat =
//                tile.latNorth.add(tile.latSouth).divide(2.0).avg();
//
//        NumberExpression<Double> centerLng =
//                tile.lngEast.add(tile.lngWest).divide(2.0).avg();
//
//        int limitLength = Math.min(6, geoHashString.length() + 1);
//        StringTemplate geoHashPrefix = Expressions.stringTemplate(
//                "left({0}, {1})",
//                tile.geoHash,
//                limitLength
//        );
//
//        return queryFactory.select(
//                        Projections.constructor(
//                                TileClusterGetResponse.class,
//                                tile.zodiacId,
//                                Projections.constructor(
//                                        GeoPoint.class,
//                                        centerLat,
//                                        centerLng
//                                ),
//                                tile.count()
//                        )
//                )
//                .from(tile)
//                .where(
//                        tile.geoHash.startsWith(geoHashString),
//                        tile.zodiacId.isNotNull(),
//                        eqZodiacId(zodiacId)
//                )
//                .groupBy(tile.zodiacId, geoHashPrefix)
//                .fetch();
//    }

    @Override
    public List<TileMemberClusterGetResponse> getMemberTileCluster(
            String geoHashString,
            LocalDate localDate,
            Long memberId
    ) {

        int limitLength = Math.min(6, geoHashString.length() + 1);
        StringTemplate geoHashPrefix = Expressions.stringTemplate(
                "left({0}, {1})",
                tile.geoHash,
                limitLength
        );

        return queryFactory.select(
            Projections.constructor(
                TileMemberClusterGetResponse.class,
                    Projections.constructor(
                            GeoPoint.class,
                            tile.latNorth.add(tile.latSouth).divide(2).avg(),
                            tile.lngEast.add(tile.lngWest).divide(2).avg()
                    ),
                    tile.count()
                )
        )
                .from(tileHistoryJpa)
                .join(runningPoint).on(tileHistoryJpa.runningPointId.eq(runningPoint.runningPointId))
                .join(tile).on(tileHistoryJpa.geoHash.eq(tile.geoHash))
                .where(
                        tileHistoryJpa.memberId.eq(memberId),
                        runningPoint.arrivalTime.goe(localDate.atStartOfDay())
                                .and(runningPoint.arrivalTime.lt(localDate.plusDays(1).atStartOfDay())),
                        tile.geoHash.startsWith(geoHashPrefix)
                )
                .groupBy(geoHashPrefix)
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
