package com.ssafy.yoittang.tile.domain.request;

import java.time.LocalDate;

import lombok.Builder;

@Builder
public record PersonalTileGetRequest(
    Long memberId,
    Double lat,
    Double lng,
    LocalDate localDate
) { }
