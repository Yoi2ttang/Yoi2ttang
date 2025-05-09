package com.ssafy.yoittang.running.application;

import java.time.LocalDate;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.common.exception.NotFoundException;
import com.ssafy.yoittang.course.domain.repository.CourseJpaRepositoy;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.running.domain.Running;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.running.domain.State;
import com.ssafy.yoittang.running.domain.dto.request.ChallengeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.request.FreeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.request.RunningEndPatchRequest;
import com.ssafy.yoittang.running.domain.dto.response.RunningCreateResponse;
import com.ssafy.yoittang.runningpoint.domain.RunningPoint;
import com.ssafy.yoittang.runningpoint.domain.RunningPointRepository;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.Tile;
import com.ssafy.yoittang.tile.domain.TileRepository;
import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;


import ch.hsr.geohash.GeoHash;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class RunningService {

    private final RunningRepository runningRepository;
    private final RunningPointRepository runningPointRepository;
    private final TileHistoryRepository tileHistoryRepository;
    private final TileRepository tileRepository;
    private final CourseJpaRepositoy courseJpaRepositoy;

    @Transactional
    public RunningCreateResponse createFreeRunning(
            FreeRunningCreateRequest freeRunningCreateRequest,
            Member member
    ) {

        Running running = Running.builder()
                .memberId(member.getMemberId())
                .startTime(freeRunningCreateRequest.currentTime())
                .state(State.RUNNING)
                .build();

        runningRepository.save(running);

        RunningPoint runningPoint = RunningPoint.builder()
                .runningId(running.getRunningId())
                .sequence(0)
                .arrivalTime(freeRunningCreateRequest.currentTime())
                .route(getLineStringByOnePoint(freeRunningCreateRequest.lat(), freeRunningCreateRequest.lng()))
                .build();

        runningPointRepository.save(runningPoint);

        String geoHashString = GeoHash.geoHashStringWithCharacterPrecision(
                freeRunningCreateRequest.lat(),
                freeRunningCreateRequest.lng(),
                7);

        Tile tile = tileRepository.findByGeoHash(geoHashString)
                .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_TILE_INFO));

        saveTileHistoryInRedis(geoHashString, runningPoint.getRunningPointId(), member);

        return RunningCreateResponse.builder()
                .runningId(running.getRunningId())
                .geoHash(geoHashString)
                .sw(GeoPoint.builder()
                        .lat(tile.getLatSouth())
                        .lng(tile.getLngWest())
                        .build())
                .ne(GeoPoint.builder()
                        .lat(tile.getLatNorth())
                        .lng(tile.getLngEast())
                        .build())
                .build();
    }

    @Transactional
    public RunningCreateResponse createChallengeRunning(
            ChallengeRunningCreateRequest challengeRunningCreateRequest,
            Member member
    ) {

        checkCourse(challengeRunningCreateRequest.courseId());

        Running running = Running.builder()
                .memberId(member.getMemberId())
                .courseId(challengeRunningCreateRequest.courseId())
                .startTime(challengeRunningCreateRequest.currentTime())
                .state(State.RUNNING)
                .build();

        runningRepository.save(running);

        RunningPoint runningPoint = RunningPoint.builder()
                .runningId(running.getRunningId())
                .sequence(0)
                .arrivalTime(challengeRunningCreateRequest.currentTime())
                .route(getLineStringByOnePoint(
                        challengeRunningCreateRequest.lat(),
                        challengeRunningCreateRequest.lng())
                )
                .build();

        runningPointRepository.save(runningPoint);

        String geoHashString = GeoHash.geoHashStringWithCharacterPrecision(
                challengeRunningCreateRequest.lat(),
                challengeRunningCreateRequest.lng(),
                7);

        Tile tile = tileRepository.findByGeoHash(geoHashString)
                .orElseThrow(() -> new NotFoundException(ErrorCode.RUNNING_NOT_FOUND));

        saveTileHistoryInRedis(geoHashString, runningPoint.getRunningPointId(), member);


        return RunningCreateResponse.builder()
                .runningId(running.getRunningId())
                .geoHash(geoHashString)
                .sw(GeoPoint.builder()
                        .lat(tile.getLatSouth())
                        .lng(tile.getLngWest())
                        .build())
                .ne(GeoPoint.builder()
                        .lat(tile.getLatNorth())
                        .lng(tile.getLngEast())
                        .build())
                .build();
    }

    @Transactional
    public void endRunning(
            Long runningId,
            RunningEndPatchRequest runningEndPatchRequest,
            Member member
    ) {

        Running running =
                runningRepository.findByRunningIdAndMemberId(runningId, member.getMemberId())
                .orElseThrow(() -> new NotFoundException(ErrorCode.RUNNING_NOT_FOUND));

        if (running.getStartTime().isAfter(runningEndPatchRequest.endTime())) {
            throw new BadRequestException(ErrorCode.END_TIME_BEFORE_START_TIME);
        }

        running.setState(State.COMPLETE);
        running.setEndTime(runningEndPatchRequest.endTime());
    }

    void checkCourse(Long courseId) {
        if (courseJpaRepositoy.existsById(courseId)) {
            return;
        }
        throw new NotFoundException(ErrorCode.NOT_FOUND_COURSE);
    }


    public LineString getLineStringByOnePoint(Double lat, Double lng) {

        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

        Coordinate coordinate = new Coordinate(lng, lat);

        Coordinate[] coordinates = new Coordinate[] { coordinate, coordinate };

        return geometryFactory.createLineString(coordinates);
    }

    void saveTileHistoryInRedis(
            String geoHashString,
            Long runningPointId,
            Member member
    ) {

        tileHistoryRepository.saveRedis(
                LocalDate.now().toString(),
                TileHistoryRedis.builder()
                        .tileHistoryId(TileHistoryRedis.makeTileHistoryId(member.getMemberId(), geoHashString))
                        .memberId(member.getMemberId())
                        .birthDate(member.getBirthDate())
                        .zordiacId(member.getZordiacId())
                        .geoHash(geoHashString)
                        .runningPointId(runningPointId)
                        .build());
    }
}
