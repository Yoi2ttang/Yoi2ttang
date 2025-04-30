package com.ssafy.yoittang.tile.presentation;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.tile.application.TileService;
import com.ssafy.yoittang.tile.domain.request.PersonalTileGetRequest;
import com.ssafy.yoittang.tile.domain.response.PersonalTileGetResponseWrapper;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;
import com.ssafy.yoittang.tilehistory.application.TileHistoryService;

import lombok.RequiredArgsConstructor;

@RequestMapping("tiles")
@RestController
@RequiredArgsConstructor
public class TileController {

    private final TileService tileService;
    private final TileHistoryService tileHistoryService;

    @PostMapping
    public ResponseEntity<Void> createdTile() {
        tileService.createTile(7);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/team")
    public ResponseEntity<TileGetResponseWrapper> getTile(
            @RequestParam Double lat,
            @RequestParam Double lng
    ) {
        return ResponseEntity.ok(tileService.getTile(lat, lng));
    }

    @GetMapping("/team/{zordiacId}")
    public ResponseEntity<TileGetResponseWrapper> getTile(
            @PathVariable(name = "zordiacId") Long zordiacId,
            @RequestParam Double lat,
            @RequestParam Double lng
    ) {
        return ResponseEntity.ok(tileService.getTile(zordiacId, lat, lng));
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<PersonalTileGetResponseWrapper> getTile(
            @PathVariable(name = "memberId") Long memberId,
            @RequestParam Double lat,
            @RequestParam Double lng,
            @RequestParam LocalDate localDate,
            @AuthMember Member loginMember
    ) {

        PersonalTileGetRequest personalTileGetRequest = PersonalTileGetRequest.builder()
                .memberId(memberId)
                .lat(lat)
                .lng(lng)
                .localDate(localDate)
                .build();

        return ResponseEntity.ok(tileHistoryService.getTile(personalTileGetRequest, loginMember));
    }

}
