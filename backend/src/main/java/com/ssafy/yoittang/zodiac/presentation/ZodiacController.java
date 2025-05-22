package com.ssafy.yoittang.zodiac.presentation;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.zodiac.application.ZodiacService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/zodiac")
public class ZodiacController {
    private final ZodiacService zodiacService;

    @PostMapping("/bulkInsert")
    public ResponseEntity<Void> createZordaic() {
        zodiacService.save();
        return ResponseEntity.created(URI.create("/api/v1/zodiac/bulkInsert")).build();
    }
}
