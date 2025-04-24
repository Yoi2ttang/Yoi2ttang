package com.ssafy.yoittang.runningpoint.domain.dto.request;

import jakarta.validation.constraints.NotNull;

public record GeoPoint(

        @NotNull
        Double lat,

        @NotNull
        Double lng
) { }
