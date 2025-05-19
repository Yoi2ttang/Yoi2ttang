package com.ssafy.yoittang.tile.presentation;

import java.time.LocalDate;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.request.TwoGeoPoint;
import jakarta.validation.Valid;

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
import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponseWrapper;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;
import com.ssafy.yoittang.tile.domain.response.TilePreviewResponse;
import com.ssafy.yoittang.tile.domain.response.TileRankingResponse;
import com.ssafy.yoittang.tile.domain.response.TileSituationResponse;
import com.ssafy.yoittang.tilehistory.application.TileHistoryService;
import com.ssafy.yoittang.tilehistory.domain.dto.reqeust.TileMemberRankingRequest;
import com.ssafy.yoittang.tilehistory.domain.dto.response.TileMemberRankingResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("tiles")
@RestController
@RequiredArgsConstructor
public class TileController implements TileControllerSwaggerDoc {

    private final TileService tileService;
    private final TileHistoryService tileHistoryService;

    @PostMapping
    public ResponseEntity<Void> createdTile() {
        tileService.createTile(7);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/teams")
    public ResponseEntity<TileGetResponseWrapper> getTile(
            @RequestParam Double lat,
            @RequestParam Double lng
    ) {
        return ResponseEntity.ok(tileService.getTile(lat, lng));
    }

    @GetMapping("/teams/new")
    public ResponseEntity<TileGetResponseWrapper> getTile(
            @RequestParam("swLat") Double swLat,
            @RequestParam("swLng") Double swLng,
            @RequestParam("neLat") Double neLat,
            @RequestParam("neLng") Double neLng
    ) {
        return ResponseEntity.ok(tileService.getTile(null, new TwoGeoPoint(
                    new GeoPoint(swLat, swLng),
                    new GeoPoint(neLat, neLng)
                )
            )
        );
    }

    @GetMapping("/teams/{zodiacId}")
    public ResponseEntity<TileGetResponseWrapper> getTile(
            @PathVariable(name = "zodiacId") Long zodiacId,
            @RequestParam Double lat,
            @RequestParam Double lng
    ) {
        return ResponseEntity.ok(tileService.getTile(zodiacId, lat, lng));
    }

    @GetMapping("/teams/{zodiacId}/new")
    public ResponseEntity<TileGetResponseWrapper> getTile(
            @PathVariable(name = "zodiacId") Long zodiacId,
            @RequestParam("swLat") Double swLat,
            @RequestParam("swLng") Double swLng,
            @RequestParam("neLat") Double neLat,
            @RequestParam("neLng") Double neLng
    ) {
        return ResponseEntity.ok(tileService.getTile(zodiacId, new TwoGeoPoint(
                    new GeoPoint(swLat, swLng),
                    new GeoPoint(neLat, neLng)
                )
            )
        );
    }

    @GetMapping("/teams/cluster")
    public ResponseEntity<TileClusterGetResponseWrapper> getTileCluster(
        @RequestParam Double lat,
        @RequestParam Double lng,
        @RequestParam Integer zoomLevel
    ) {
        return ResponseEntity.ok(tileService.getTileCluster(lat, lng, zoomLevel));
    }

    @GetMapping("/teams/cluster/{zodiacId}")
    public ResponseEntity<TileClusterGetResponseWrapper> getTileCluster(
            @PathVariable Long zodiacId,
            @RequestParam Double lat,
            @RequestParam Double lng,
            @RequestParam Integer zoomLevel
    ) {
        return ResponseEntity.ok(tileService.getTileCluster(zodiacId, lat, lng, zoomLevel));
    }

    @GetMapping("teams/{zodiacId}/situation")
    public ResponseEntity<TileSituationResponse> getTileSituation(
            @PathVariable Long zodiacId
    ) {
        return ResponseEntity.ok(tileService.getTileSituation(zodiacId));
    }


    @GetMapping("/members/{memberId}")
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

    @GetMapping("/rankings")
    public ResponseEntity<TileRankingResponse> getTeamRanking() {
        return ResponseEntity.ok(tileService.getTeamRanking());
    }

    @GetMapping("/rankings/previews")
    public ResponseEntity<TilePreviewResponse> getRankingPreview(
            @RequestParam(required = false) Long zodiacId,
            @RequestParam(required = false, defaultValue = "3") Integer limit
    ) {
        return ResponseEntity.ok(tileService.getRankingPreview(zodiacId, limit));
    }


    @GetMapping("/rankings/{zodiacId}")
    public ResponseEntity<TileMemberRankingResponse> getMemberRanking(
            @PathVariable Long zodiacId,
            @Valid TileMemberRankingRequest tileMemberRankingRequest
    ) {
        return ResponseEntity.ok(tileHistoryService.getTileMemberRankingList(zodiacId, tileMemberRankingRequest));
    }
}
