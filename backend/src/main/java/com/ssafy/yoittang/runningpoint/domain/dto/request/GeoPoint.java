package com.ssafy.yoittang.runningpoint.domain.dto.request;

import jakarta.validation.constraints.NotNull;

public record GeoPoint(

        @NotNull
        Long lat,

        @NotNull
        Long lng
) { }
