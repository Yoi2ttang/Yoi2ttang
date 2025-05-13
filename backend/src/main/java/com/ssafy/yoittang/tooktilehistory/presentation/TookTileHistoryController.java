package com.ssafy.yoittang.tooktilehistory.presentation;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.tooktilehistory.application.TookTileHistoryService;
import com.ssafy.yoittang.tooktilehistory.domain.dto.response.TookTileHistoryResponse;
import com.ssafy.yoittang.tooktilehistory.domain.dto.resquest.TookTileHistoryGroupByPeriodRequest;

import lombok.RequiredArgsConstructor;

@RequestMapping("took-tile-histories")
@RestController
@RequiredArgsConstructor
public class TookTileHistoryController {

    private final TookTileHistoryService tookTileHistoryService;

    @GetMapping
    public ResponseEntity<TookTileHistoryResponse> getTookTileHistoryGroupByPeriod(
            @Valid TookTileHistoryGroupByPeriodRequest tookTileHistoryGroupByPeriodRequest
    ) {

        TookTileHistoryResponse tookTileHistoryResponse
                = tookTileHistoryService.getTookTileHistoryByGroupByPeriod(tookTileHistoryGroupByPeriodRequest);

        return  ResponseEntity.ok(tookTileHistoryResponse);
    }

}
