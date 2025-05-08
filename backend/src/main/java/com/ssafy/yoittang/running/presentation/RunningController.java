package com.ssafy.yoittang.running.presentation;

import com.ssafy.yoittang.common.exception.NotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.running.application.RunningService;
import com.ssafy.yoittang.running.domain.dto.request.ChallengeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.request.FreeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.request.RunningEndPatchRequest;
import com.ssafy.yoittang.running.domain.dto.response.RunningCreateResponse;
import com.ssafy.yoittang.runningpoint.application.RunningPointService;
import com.ssafy.yoittang.runningpoint.domain.dto.request.RunningPointCreateRequest;
import com.ssafy.yoittang.runningpoint.domain.dto.reseponse.RunningPointCreateResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("running")
@RequiredArgsConstructor
public class RunningController implements RunningControllerSwaggerDoc {

    private final RunningService runningService;
    private final RunningPointService runningPointService;

    @PostMapping("/free")
    public ResponseEntity<RunningCreateResponse> createFreeRunning(
            @Valid @RequestBody FreeRunningCreateRequest freeRunningCreateRequest,
            @AuthMember Member loginMember
    ) {
        RunningCreateResponse response = runningService.createFreeRunning(freeRunningCreateRequest, loginMember);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/challenge")
    public ResponseEntity<RunningCreateResponse> createChallengeRunning(
            @Valid @RequestBody ChallengeRunningCreateRequest challengeRunningCreateRequest,
            @AuthMember Member loginMember
    ) {
        RunningCreateResponse response = runningService.createChallengeRunning(
                challengeRunningCreateRequest,
                loginMember
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{runningId}/end")
    public ResponseEntity<Void> endFreeRunning(
            @PathVariable(name = "runningId") Long runningId,
            @Valid @RequestBody RunningEndPatchRequest runningEndPatchRequest,
            @AuthMember Member loginMember
    ) {
        runningService.endFreeRunning(runningId, runningEndPatchRequest, loginMember);

        return ResponseEntity.ok(null);
    }

    @PostMapping("/location")
    public ResponseEntity<RunningPointCreateResponse> createCoordinate(
            @Valid @RequestBody RunningPointCreateRequest runningPointCreateRequest,
            @AuthMember Member loginMember
    ) {
        RunningPointCreateResponse runningPointCreateResponse
                = runningPointService.createRunningPoint(runningPointCreateRequest, loginMember);

        return ResponseEntity.status(HttpStatus.CREATED).body(runningPointCreateResponse);
    }

}
