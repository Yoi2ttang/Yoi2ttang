package com.ssafy.yoittang.tile.domain.response;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;

import lombok.Builder;

@Builder
public record PersonalTileGetResponse(
        String geoHash,
        GeoPoint sw,
        GeoPoint ne
) { }
