package com.ssafy.yoittang.runningpoint.domain.dto.request;

import jakarta.validation.constraints.NotNull;

import lombok.Builder;

@Builder
public record GeoPoint(

        @NotNull
        Double lat,

        @NotNull
        Double lng
) { }
