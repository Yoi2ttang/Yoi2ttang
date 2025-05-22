package com.ssafy.yoittang.runningpoint.domain.dto.reseponse;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;

import lombok.Builder;

@Builder
public record RunningPointCreateResponse(
        String geoHash,
        GeoPoint sw,
        GeoPoint ne
) { }
