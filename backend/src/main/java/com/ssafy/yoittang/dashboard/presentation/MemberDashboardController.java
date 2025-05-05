package com.ssafy.yoittang.dashboard.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.dashboard.application.MemberDashboardService;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyCompleteCourseResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyDistanceResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyRunningTimeResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyTileResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDashboardResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.TileChangeRateResponse;
import com.ssafy.yoittang.member.domain.Member;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/memberDashboard")
public class MemberDashboardController {
    private final MemberDashboardService memberDashboardService;

    @GetMapping
    public ResponseEntity<MemberDashboardResponse> getMemberDashboard(@AuthMember Member member) {
        return ResponseEntity.ok(memberDashboardService.getMemberDashboard(member));
    }

    @GetMapping("/daily-distances")
    public ResponseEntity<List<MemberDailyDistanceResponse>> getMonthRunDistance(@AuthMember Member member) {
        return ResponseEntity.ok(memberDashboardService.getMonthRunDistance(member));
    }

    @GetMapping("/daily-running-times")
    public ResponseEntity<List<MemberDailyRunningTimeResponse>> getMonthRunningTimes(@AuthMember Member member) {
        return ResponseEntity.ok(memberDashboardService.getMonthRunningTimes(member));
    }

    @GetMapping("/daily-tiles-count")
    public ResponseEntity<List<MemberDailyTileResponse>> getMonthTiles(@AuthMember Member member) {
        return ResponseEntity.ok(memberDashboardService.getMonthTiles(member));
    }

    @GetMapping("/daily-courses-count")
    public ResponseEntity<List<MemberDailyCompleteCourseResponse>> getMonthCompleteCourse(@AuthMember Member member) {
        return ResponseEntity.ok(memberDashboardService.getMonthCompleteCourse(member));
    }

    @GetMapping("/tile-change/daily")
    public ResponseEntity<TileChangeRateResponse> getDailyTileChangeRate(@AuthMember Member member) {
        return ResponseEntity.ok(memberDashboardService.getDailyTileChangeRate(member));
    }

    @GetMapping("/tile-change/weekly")
    public ResponseEntity<TileChangeRateResponse> getWeeklyTileChangeRate(@AuthMember Member member) {
        return ResponseEntity.ok(memberDashboardService.getWeeklyTileChangeRate(member));
    }
}
