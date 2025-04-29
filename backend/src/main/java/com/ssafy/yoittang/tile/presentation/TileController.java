package com.ssafy.yoittang.tile.presentation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.application.TileService;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;

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

    @GetMapping
    public ResponseEntity<TileGetResponseWrapper> getTile(GeoPoint geoPoint) {
        return ResponseEntity.ok(tileService.getTile(geoPoint));
    }

}
