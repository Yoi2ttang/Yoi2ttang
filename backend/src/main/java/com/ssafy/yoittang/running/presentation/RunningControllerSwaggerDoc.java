package com.ssafy.yoittang.running.presentation;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.running.domain.dto.request.ChallengeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.request.FreeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.response.RunningCreateResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

public interface RunningControllerSwaggerDoc {

    @Operation(summary = "free 러닝 시작", description = "course를 지정하지 않고 자유롭게 뛰는 running을 생성합니다.")
    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "201",
                description = "free 러닝 생성 성공",
                content = @Content(schema = @Schema(implementation = RunningCreateResponse.class))
            ),
        @ApiResponse(
                responseCode = "400",
                description = "로그인 안하면 badRequest"
            ),
        @ApiResponse(
                responseCode = "404",
                description = "존재하지 않는 geohash"
            )
    })
    ResponseEntity<RunningCreateResponse> createFreeRunning(
            @Valid @RequestBody FreeRunningCreateRequest freeRunningCreateRequest,
            @AuthMember Member loginMember
    );

    @Operation(summary = "challenge 러닝 시작", description = "challenge를 지정하고 running을 생성합니다.")
    @ApiResponses(value = {
        @ApiResponse(
                    responseCode = "201",
                    description = "free 러닝 생성 성공",
                    content = @Content(schema = @Schema(implementation = RunningCreateResponse.class))
            ),
        @ApiResponse(
                    responseCode = "400",
                    description = "로그인 안하면 badRequest"
            ),
        @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 geohash"
            )
    })
    ResponseEntity<RunningCreateResponse> createChallengeRunning(
            @Valid @RequestBody ChallengeRunningCreateRequest challengeRunningCreateRequest,
            @AuthMember Member loginMember
    );
}
