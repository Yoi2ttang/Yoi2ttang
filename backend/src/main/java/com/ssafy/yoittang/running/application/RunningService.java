package com.ssafy.yoittang.running.application;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.opencsv.CSVReader;
import com.ssafy.yoittang.runningpoint.domain.dto.request.LocationRecord;
import lombok.extern.java.Log;
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
import org.springframework.web.multipart.MultipartFile;


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

    @Transactional
    public void endRunningWithCsv(
        Long runningId,
        MultipartFile file,
        Member member
    ) {

        Running running =
                runningRepository.findByRunningIdAndMemberId(runningId, member.getMemberId())
                        .orElseThrow(() -> new NotFoundException(ErrorCode.RUNNING_NOT_FOUND));

        List<LocationRecord> locationRecordList = new ArrayList<>();
        Set<String> geoHashStringSet = new HashSet<>();
        HashMap<String, Integer> sequenceMap = new HashMap<>();


        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVReader csvReader = new CSVReader(reader)) {

            String[] line;
            csvReader.readNext(); // skip header if exists

            int sequence = 0;

            while ((line = csvReader.readNext()) != null) {

                ++sequence;

                double lat = Double.parseDouble(line[1]);
                double lng = Double.parseDouble(line[2]);

                String geoHashString = GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 7);

                LocationRecord record = LocationRecord.builder()
                        .time(LocalDateTime.parse(line[0]))
                        .geoPoint(GeoPoint.builder()
                                .lat(lat)
                                .lng(lng)
                                .build())
                        .build();

                locationRecordList.add(record);

                if (!geoHashStringSet.contains(geoHashString)) {
                    geoHashStringSet.add(geoHashString);
                    sequenceMap.put(geoHashString, sequence);
                }


            }

        } catch (Exception e) {
            e.printStackTrace(); // 혹은 로깅
        }

        //running 종료 업데이트
        running.setState(State.COMPLETE);

        LocalDateTime endTime = locationRecordList.isEmpty()
                ? LocalDateTime.now()
                : locationRecordList.get(locationRecordList.size() -1 ).time();

        running.setEndTime(endTime);

        if (locationRecordList.isEmpty()){
            return;
        }

        runningPointRepository.bulkInsert(locationRecordList, runningId, running.getCourseId());

        List<TileHistoryRedis> tileHistoryList = new ArrayList<>();
        List<RunningPoint> runningPointList = runningPointRepository.findByRunningIdOrderBySequence(runningId);

        tileHistoryList = geoHashStringSet.stream().map(
                s -> TileHistoryRedis.builder()
                                .zodiacId(member.getZodiacId())
                                .memberId(member.getMemberId())
                                .birthDate(member.getBirthDate())
                                .geoHash(s)
                                .runningPointId(runningPointList.get(
                                            sequenceMap.get(s)
                                    ).getRunningPointId()
                                )
                        .build()
        )
                .sorted(Comparator.comparingLong(TileHistoryRedis::getRunningPointId))
                .toList();

        tileHistoryRepository.bulkInsertToPostGreSQL(tileHistoryList);
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
                        .zodiacId(member.getZodiacId())
                        .geoHash(geoHashString)
                        .runningPointId(runningPointId)
                        .build());
    }
}
