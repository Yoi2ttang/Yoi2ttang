package com.ssafy.yoittang.runningpoint.domain.dto.request;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record LocationRecord(
        LocalDateTime time,
        GeoPoint geoPoint
) { }
