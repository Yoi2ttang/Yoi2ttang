package com.ssafy.yoittang.zordiac.presentation;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.zordiac.application.ZordiacService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/zordiac")
public class ZordiacController {
    private final ZordiacService zordiacService;

    @PostMapping("/bulkInsert")
    public ResponseEntity<Void> createZordaic() {
        zordiacService.save();
        return ResponseEntity.created(URI.create("/api/v1/zordiac/bulkInsert")).build();
    }
}
