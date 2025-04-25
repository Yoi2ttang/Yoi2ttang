package com.ssafy.yoittang.tileinfo.presentation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.tileinfo.application.TileInfoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tile-info")
@RequiredArgsConstructor
public class TileInfoController {

    private final TileInfoService tileInfoService;

    @PostMapping
    public ResponseEntity<Void> createTileInfo() {

        tileInfoService.createTileInfo(7);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
