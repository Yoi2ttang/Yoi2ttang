package com.ssafy.yoittang.tile.domain.response;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;

public record TileGetResponse(
        String geoHash,
        Long zordiacId,
        GeoPoint sw,
        GeoPoint ne
) { }
