package com.ssafy.yoittang.running.domain.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record ChallengeRunningCreateRequest(

        @NotNull
        Long courseId,

        @NotNull
        Long lat,

        @NotNull
        Long lng,

        @NotNull
        LocalDateTime currentTime
) {
}
