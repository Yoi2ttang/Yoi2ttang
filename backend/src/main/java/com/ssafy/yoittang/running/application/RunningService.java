package com.ssafy.yoittang.running.application;

import com.ssafy.yoittang.runningpoint.domain.RunningPoint;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.running.domain.Running;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.running.domain.State;
import com.ssafy.yoittang.running.domain.dto.request.ChallengeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.request.FreeRunningCreateRequest;
import com.ssafy.yoittang.runningpoint.domain.RunningPointRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RunningService {

    private final RunningRepository runningRepository;
    private final RunningPointRepository runningPointRepository;

    @Transactional
    public Long createFreeRunning(
            FreeRunningCreateRequest freeRunningCreateRequest,
            Member member
    ) {

        Running running = Running.builder()
                .memberId(member.getMemberId())
                .state(State.RUNNING)
                .build();

        runningRepository.save(running);

        runningPointRepository.save(RunningPoint.builder()
                .runningId(running.getRunningId())
                .sequence(0)
                .arrivalTime(freeRunningCreateRequest.currentTime())
                .root(getLineStringByOnePoint(freeRunningCreateRequest.lat(), freeRunningCreateRequest.lng()))
                .build());


        return running.getRunningId();
    }

    @Transactional
    public Long createChallengeRunning(
            ChallengeRunningCreateRequest challengeRunningCreateRequest,
            Member member
    ) {

        Running running = Running.builder()
                .memberId(member.getMemberId())
                .courseId(challengeRunningCreateRequest.courseId())
                .state(State.RUNNING)
                .build();

        runningRepository.save(running);

        runningPointRepository.save(RunningPoint.builder()
                .runningId(running.getRunningId())
                .sequence(0)
                .arrivalTime(challengeRunningCreateRequest.currentTime())
                .root(getLineStringByOnePoint(challengeRunningCreateRequest.lat(), challengeRunningCreateRequest.lng()))
                .build());

        return  running.getRunningId();
    }

    @Transactional
    public void endFreeRunning(
            Long runningId,
            Member member
    ) {

        Running running =
                runningRepository.findByRunningIdAndMemberId(runningId, member.getMemberId())
                .orElseThrow();

        running.setState(State.COMPLETE);
    }

    LineString getLineStringByOnePoint(Long lat, Long lng) {

        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

        Coordinate coordinate = new Coordinate(lng, lat);

        Coordinate[] coordinates = new Coordinate[] { coordinate, coordinate };

        return geometryFactory.createLineString(coordinates);
    }
}
