package com.ssafy.yoittang.tile.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;


public interface TileControllerSwaggerDoc {

    @Operation(summary = "전체 점령 지도 확인", description = "팀 상관없이 좌표 근처에 대한 타일의 정보를 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(
                    responseCode = "200",
                    description = "성공하면 타일 return",
                    content = @Content(schema = @Schema(implementation = TileGetResponseWrapper.class))
            )
    })
    ResponseEntity<TileGetResponseWrapper> getTile(
            @Parameter(name = "lat", description = "위도", required = true)
            @RequestParam Double lat,

            @Parameter(name = "lng", description = "경도", required = true)
            @RequestParam Double lng
    );

    @Operation(summary = "특정 점령 지도 확인", description = "특정 팀이 차지한 좌표 근처에 대한 타일의 정보를 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(
                    responseCode = "200",
                    description = "성공하면 타일 return",
                    content = @Content(schema = @Schema(implementation = TileGetResponseWrapper.class))
            )
    })
    ResponseEntity<TileGetResponseWrapper> getTile(
            @Parameter(name = "zordiacId", description = "조디악 ID", required = true)
            @PathVariable(name = "zordiacId") Long zordiacId,

            @Parameter(name = "lat", description = "위도", required = true)
            @RequestParam Double lat,

            @Parameter(name = "lng", description = "경도", required = true)
            @RequestParam Double lng
    );
}
