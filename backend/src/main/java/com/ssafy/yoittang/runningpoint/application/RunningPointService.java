package com.ssafy.yoittang.runningpoint.application;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.runningpoint.domain.RunningPoint;
import com.ssafy.yoittang.runningpoint.domain.RunningPointRepository;
import com.ssafy.yoittang.runningpoint.domain.dto.request.RunningPointCreateRequest;
import com.ssafy.yoittang.runningpoint.domain.dto.reseponse.TopRunningPointResponse;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RunningPointService {

    private final RunningPointRepository runningPointRepository;

    @Transactional
    public void createRunningPoint(
            RunningPointCreateRequest runningPointCreateRequest,
            Member member
    ) {

        TopRunningPointResponse topCoordinateResponse
                = runningPointRepository.getTopRunningPointByRunningIdAndMemberId(
                        runningPointCreateRequest.runningId(),
                        member.getMemberId()
                );

//        if(topCoordinateResponse == null){
//            throw new
//        }

//        if (topCoordinateResponse.state().equals(State.COMPLETE)) {
//           throw new
//        }

        Point start = topCoordinateResponse.root().getEndPoint();

        LineString newRoot
                = getLineStringWithTwoPoint(start, runningPointCreateRequest.lat(), runningPointCreateRequest.lng());

        runningPointRepository.save(RunningPoint.builder()
                        .runningId(runningPointCreateRequest.runningId())
                        .courseId(runningPointCreateRequest.courseId())
                        .sequence(topCoordinateResponse.sequence())
                        .arrivalTime(runningPointCreateRequest.currentTime())
                        .root(newRoot)
                        .build());
    }

    LineString getLineStringWithTwoPoint(Point start, long lat, long lng) {

        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

        Coordinate startCoordinate = start.getCoordinate();
        Coordinate endCoordinate = new Coordinate(lng, lat);

        Coordinate[] coordinates = new Coordinate[] { startCoordinate, endCoordinate };

        return geometryFactory.createLineString(coordinates);
    }

}
