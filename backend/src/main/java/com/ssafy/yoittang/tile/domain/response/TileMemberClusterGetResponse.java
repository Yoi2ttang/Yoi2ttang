package com.ssafy.yoittang.tile.domain.response;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;

public record TileMemberClusterGetResponse(
        GeoPoint geoPoint,
        Long count
) { }
