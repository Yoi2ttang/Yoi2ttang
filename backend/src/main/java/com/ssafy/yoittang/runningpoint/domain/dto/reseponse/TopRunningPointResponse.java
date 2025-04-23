package com.ssafy.yoittang.runningpoint.domain.dto.reseponse;

import org.locationtech.jts.geom.LineString;

import com.ssafy.yoittang.running.domain.State;

public record TopRunningPointResponse(
        Integer sequence,
        LineString root,
        State state
) { }
