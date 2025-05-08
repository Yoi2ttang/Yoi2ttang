package com.ssafy.yoittang.running.domain.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record RunningEndPatchRequest(

        @Schema(description = "종료시간", example = "2025-05-08T14:45:00")
        @NotNull
        LocalDateTime endTime
) { }
