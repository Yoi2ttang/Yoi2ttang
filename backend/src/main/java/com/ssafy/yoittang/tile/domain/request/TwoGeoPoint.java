package com.ssafy.yoittang.tile.domain.request;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;

public record  TwoGeoPoint(
        GeoPoint sw,
        GeoPoint ne
) { }
