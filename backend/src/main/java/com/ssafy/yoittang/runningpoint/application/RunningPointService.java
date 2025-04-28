package com.ssafy.yoittang.runningpoint.application;

import java.time.LocalDate;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.common.exception.NotFoundException;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.runningpoint.domain.RunningPoint;
import com.ssafy.yoittang.runningpoint.domain.RunningPointRepository;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.runningpoint.domain.dto.request.RunningPointCreateRequest;
import com.ssafy.yoittang.runningpoint.domain.dto.reseponse.RunningPointCreateResponse;
import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;

import ch.hsr.geohash.BoundingBox;
import ch.hsr.geohash.GeoHash;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RunningPointService {

    private final RunningRepository runningRepository;
    private final RunningPointRepository runningPointRepository;
    private final TileHistoryRepository tileHistoryRepository;


    @Transactional
    public RunningPointCreateResponse createRunningPoint(
            RunningPointCreateRequest runningPointCreateRequest,
            Member member
    ) {

        if (!runningRepository.existsByRunningIdAndMemberId(
                runningPointCreateRequest.runningId(),
                member.getMemberId())) {
            throw new NotFoundException(ErrorCode.RUNNING_NOT_FOUND);
        }

        LineString newRoot
                = getLineStringWithTwoPoint(
                        runningPointCreateRequest.beforePoint(),
                runningPointCreateRequest.nowPoint()
        );

        RunningPoint runningPoint = RunningPoint.builder()
                .runningId(runningPointCreateRequest.runningId())
                .courseId(runningPointCreateRequest.courseId())
                .arrivalTime(runningPointCreateRequest.currentTime())
                .root(newRoot)
                .build();

        runningPointRepository.save(runningPoint);

        GeoPoint nowPoint = runningPointCreateRequest.nowPoint();

        String geoHashString = GeoHash.geoHashStringWithCharacterPrecision(nowPoint.lat(), nowPoint.lng(), 7);

        String redisId = member.getMemberId() + ":" + geoHashString;

        if (tileHistoryRepository.existsInZSet(LocalDate.now().toString(), redisId)) {
            return RunningPointCreateResponse.builder().build();
        }

        GeoHash geoHash = GeoHash.fromGeohashString(geoHashString);
        BoundingBox boundingBox = geoHash.getBoundingBox();

        double latNorth = boundingBox.getNorthLatitude();
        double latSouth = boundingBox.getSouthLatitude();
        double lngEast = boundingBox.getEastLongitude();
        double lngWest = boundingBox.getWestLongitude();

        tileHistoryRepository.saveRedis(
                LocalDate.now().toString(),
                TileHistoryRedis.builder()
                        .tileHistoryId(member.getMemberId() + ":" + geoHashString)
                        .memberId(member.getMemberId())
                        .birthDate(member.getBirthDate())
                        .zordiacId(member.getZordiacId())
                        .geoHash(geoHashString)
                        .runningPointId(runningPoint.getRunningPointId())
                .build());

        return RunningPointCreateResponse.builder()
                .geoHash(geoHashString)
                .sw(GeoPoint.builder()
                        .lat(latSouth)
                        .lng(lngWest)
                        .build())
                .ne(GeoPoint.builder()
                        .lat(latNorth)
                        .lng(lngEast)
                        .build())
                .build();
    }

    LineString getLineStringWithTwoPoint(GeoPoint beforePoint, GeoPoint nowPoint) {

        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

        Coordinate startCoordinate = new Coordinate(beforePoint.lng(), beforePoint.lat());
        Coordinate endCoordinate = new Coordinate(nowPoint.lng(), nowPoint.lat());

        Coordinate[] coordinates = new Coordinate[] { startCoordinate, endCoordinate };

        return geometryFactory.createLineString(coordinates);
    }

}
