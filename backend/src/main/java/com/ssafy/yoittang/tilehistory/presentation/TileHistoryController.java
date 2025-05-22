package com.ssafy.yoittang.tilehistory.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.common.scheduler.MidnightScheduler;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tile-histories")
@RequiredArgsConstructor
public class TileHistoryController {

    private final MidnightScheduler midnightScheduler;

    @PostMapping
    public ResponseEntity<Void> createTileHistory() {

        midnightScheduler.runAtMidnight();
//        midnightScheduler.runAtMidnightWithCsv();
        return ResponseEntity.ok().build();
    }

}
