package com.ssafy.yoittang.runningpoint.application;


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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RunningPointService {

    private final RunningRepository runningRepository;
    private final RunningPointRepository runningPointRepository;

    @Transactional
    public void createRunningPoint(
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

        runningPointRepository.save(RunningPoint.builder()
                        .runningId(runningPointCreateRequest.runningId())
                        .courseId(runningPointCreateRequest.courseId())
                        .arrivalTime(runningPointCreateRequest.currentTime())
                        .root(newRoot)
                        .build());
    }

    LineString getLineStringWithTwoPoint(GeoPoint beforePoint, GeoPoint nowPoint) {

        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

        Coordinate startCoordinate = new Coordinate(beforePoint.lng(), beforePoint.lat());
        Coordinate endCoordinate = new Coordinate(nowPoint.lng(), nowPoint.lat());

        Coordinate[] coordinates = new Coordinate[] { startCoordinate, endCoordinate };

        return geometryFactory.createLineString(coordinates);
    }

}
