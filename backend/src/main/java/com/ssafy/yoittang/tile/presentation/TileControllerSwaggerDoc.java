package com.ssafy.yoittang.tile.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponseWrapper;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;
import com.ssafy.yoittang.tile.domain.response.TilePreviewResponse;
import com.ssafy.yoittang.tile.domain.response.TileRankingResponse;
import com.ssafy.yoittang.tile.domain.response.TileSituationResponse;

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
            @Parameter(name = "lat", description = "위도", required = true, example = "37.501161")
            @RequestParam Double lat,

            @Parameter(name = "lng", description = "경도", required = true, example = "127.039668")
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
            @Parameter(name = "zordiacId", description = "간지Id", required = true, example = "3")
            @PathVariable(name = "zordiacId") Long zordiacId,

            @Parameter(name = "lat", description = "위도", required = true, example = "37.501161")
            @RequestParam Double lat,

            @Parameter(name = "lng", description = "경도", required = true, example = "127.039668")
            @RequestParam Double lng
    );

    @Operation(summary = "전체 점령 클러스터링 확인", description = "팀 상관없이 좌표 근처에 대한 클러스터링 정보를 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(
                    responseCode = "200",
                    description = "성공하면 클러스터링 수 return",
                    content = @Content(schema = @Schema(implementation = TileClusterGetResponseWrapper.class))
            )
    })
    ResponseEntity<TileClusterGetResponseWrapper> getTileCluster(
            @Parameter(name = "lat", description = "위도", required = true, example = "37.501161")
            @RequestParam Double lat,

            @Parameter(name = "lng", description = "경도", required = true, example = "127.039668")
            @RequestParam Double lng,

            @Parameter(name = "zoomLevel", description = "줌레벨", required = true, example = "17")
            @RequestParam Integer zoomLevel
    );

    @Operation(summary = "특정 팀 점령 클러스터링 확인", description = "특정 팀 좌표 근처에 대한 클러스터링 정보를 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(
                    responseCode = "200",
                    description = "성공하면 클러스터링 수 return",
                    content = @Content(schema = @Schema(implementation = TileClusterGetResponseWrapper.class))
            )
    })
    ResponseEntity<TileClusterGetResponseWrapper> getTileCluster(
            @Parameter(name = "zordiacId", description = "간지Id", required = true, example = "3")
            @PathVariable Long zordiacId,

            @Parameter(name = "lat", description = "위도", required = true, example = "37.501161")
            @RequestParam Double lat,

            @Parameter(name = "lng", description = "경도", required = true, example = "127.039668")
            @RequestParam Double lng,

            @Parameter(name = "zoomLevel", description = "줌레벨", required = true, example = "17")
            @RequestParam Integer zoomLevel
    );

    @Operation(summary = "점령현황", description = "1등팀이 점령하고 있는 타일과 내 팀과의 차이를 보여줍니다.")
    @ApiResponses(value = {
        @ApiResponse(
                    responseCode = "200",
                    description = "성공하면 1등과 내 팀의 정보를 return",
                    content = @Content(schema = @Schema(implementation = TileSituationResponse.class))
            )
    })
    ResponseEntity<TileSituationResponse> getTileSituation(
            @Parameter(name = "zordiacId", description = "간지Id", required = true, example = "3")
            @PathVariable Long zordiacId
    );

    @Operation(summary = "12간지 팀 랭킹", description = "팀들의 타일 수와 랭킹을 가지고 옵니다.")
    @ApiResponses(value = {
        @ApiResponse(
                    responseCode = "200",
                    description = "성공하면 팀 랭킹 12개를 가지고 옴",
                    content = @Content(schema = @Schema(implementation = TileRankingResponse.class))
            )
    })
    ResponseEntity<TileRankingResponse> getTeamRanking();


    @Operation(summary = "12간지 팀 랭킹 미리보기", description = "팀들의 타일 수와 랭킹을 일정 수와 내 팀 랭킹만 가지고 옵니다.")
    @ApiResponses(value = {
        @ApiResponse(
                    responseCode = "200",
                    description = "성공하면 팀 랭킹 일부와 내 팀 랭킹을 가져옵니다.",
                    content = @Content(schema = @Schema(implementation = TilePreviewResponse.class))
            )
    })
     ResponseEntity<TilePreviewResponse> getRankingPreview(
            @Parameter(name = "zordiacId", description = "간지Id", required = false, example = "3")
            @RequestParam(required = false) Long zordiacId,

            @Parameter(name = "limit", description = "가져올 랭킹 수", required = false, example = "3")
            @RequestParam(required = false, defaultValue = "3") Integer limit
    );

}
