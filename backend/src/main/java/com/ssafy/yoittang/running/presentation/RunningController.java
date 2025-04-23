package com.ssafy.yoittang.running.presentation;

import com.ssafy.yoittang.runningpoint.application.RunningPointService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.running.application.RunningService;
import com.ssafy.yoittang.running.domain.dto.request.ChallengeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.request.FreeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.response.RunningCreateResponse;
import com.ssafy.yoittang.runningpoint.domain.dto.request.RunningPointCreateRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("running")
@RequiredArgsConstructor
public class RunningController {

    private final RunningService runningService;
    private final RunningPointService runningPointService;

    @PostMapping("/free")
    public ResponseEntity<RunningCreateResponse> createFreeRunning(
            @Valid FreeRunningCreateRequest freeRunningCreateRequest,
            @AuthMember Member member
    ) {
        Long runningId = runningService.createFreeRunning(freeRunningCreateRequest, member);
        RunningCreateResponse response = new RunningCreateResponse(runningId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/challenge")
    public ResponseEntity<RunningCreateResponse> createChallengeRunning(
            @Valid ChallengeRunningCreateRequest challengeRunningCreateRequest,
            @AuthMember Member member
    ) {
        Long runningId = runningService.createChallengeRunning(challengeRunningCreateRequest, member);
        RunningCreateResponse response = new RunningCreateResponse(runningId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{runningId}/end")
    public ResponseEntity<Void> endFreeRunning(
            @PathVariable(name = "runningId") Long runningId,
            @AuthMember Member member
    ) {
        runningService.endFreeRunning(runningId, member);

        return ResponseEntity.ok(null);
    }

    @PostMapping("/location")
    public ResponseEntity<Void> createCoordinate(
            RunningPointCreateRequest runningPointCreateRequest,
            @AuthMember Member member
    ) {
        runningPointService.createRunningPoint(runningPointCreateRequest, member);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
