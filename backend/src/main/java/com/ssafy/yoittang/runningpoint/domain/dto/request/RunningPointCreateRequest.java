package com.ssafy.yoittang.runningpoint.domain.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record RunningPointCreateRequest(

        Long courseId,

        @NotNull
        Long runningId,

        @NotNull
        GeoPoint beforePoint,

        @NotNull
        GeoPoint nowPoint,

        @NotNull
        LocalDateTime currentTime

) {
}
