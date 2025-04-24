package com.ssafy.yoittang.runningpoint.domain.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

public record RunningPointCreateRequest(

        @Null
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
