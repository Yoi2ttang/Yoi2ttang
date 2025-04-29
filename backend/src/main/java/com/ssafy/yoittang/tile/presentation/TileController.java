package com.ssafy.yoittang.tile.presentation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.tile.application.TileService;

import lombok.RequiredArgsConstructor;

@RequestMapping("tile")
@RestController
@RequiredArgsConstructor
public class TileController {

    private final TileService tileService;

    @PostMapping
    public ResponseEntity<Void> createdTile() {
        tileService.createTile(7);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
