package com.ssafy.yoittang.tile.presentation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.application.TileService;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;

import lombok.RequiredArgsConstructor;

@RequestMapping("tiles")
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
    public ResponseEntity<TileGetResponseWrapper> getTile(
            @RequestParam Double lat,
            @RequestParam Double lng
    ) {
        return ResponseEntity.ok(tileService.getTile(lat, lng));
    }

    @GetMapping("/{zordiacId}")
    public ResponseEntity<TileGetResponseWrapper> getTile(
            @PathVariable(name = "zordiacId") Long zordiacId,
            @RequestParam Double lat,
            @RequestParam Double lng
    ) {
        return ResponseEntity.ok(tileService.getTile(zordiacId, lat, lng));
    }

}
