package com.ssafy.yoittang.tile.domain.response;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;

public record TileGetResponse(
        String geoHash,
        Long zodiacId,
        GeoPoint sw,
        GeoPoint ne
) { }
