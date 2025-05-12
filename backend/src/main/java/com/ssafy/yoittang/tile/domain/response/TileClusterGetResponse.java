package com.ssafy.yoittang.tile.domain.response;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;

import lombok.Builder;

@Builder
public record TileClusterGetResponse(
        Long zodiacId,
        GeoPoint geoPoint,
        Long count
) { }
