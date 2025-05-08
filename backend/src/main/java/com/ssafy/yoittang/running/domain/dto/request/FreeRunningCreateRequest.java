package com.ssafy.yoittang.running.domain.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record FreeRunningCreateRequest(

        @Schema(description = "위도", example = "37.501161")
        @NotNull
        Double lat,

        @Schema(description = "경도", example = "127.039668")
        @NotNull
        Double lng,

        @Schema(description = "현재 시간", example = "2025-05-08T14:30:00")
        @NotNull
        LocalDateTime currentTime

) {
}
