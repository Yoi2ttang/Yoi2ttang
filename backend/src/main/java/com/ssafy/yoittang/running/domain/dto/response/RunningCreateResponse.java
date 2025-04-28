package com.ssafy.yoittang.running.domain.dto.response;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;

import lombok.Builder;

@Builder
public record RunningCreateResponse(
     Long runningId,
     String geoHash,
     GeoPoint sw, // 남서쪽의 위/경도 좌표
     GeoPoint ne // 북동쪽의 위/경도 좌표
) { }
