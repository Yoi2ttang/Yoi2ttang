package com.ssafy.yoittang.dashboard.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.dashboard.application.MemberDashboardService;
import com.ssafy.yoittang.dashboard.domain.TileChangePeriod;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberCoursePoints;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyDistanceResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyRunningTimeResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyTileResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDashboardResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.TileChangeRateResponse;
import com.ssafy.yoittang.member.domain.Member;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboards/members")
public class MemberDashboardController {
    private final MemberDashboardService memberDashboardService;

    @GetMapping
    public ResponseEntity<MemberDashboardResponse> getMemberDashboard(@AuthMember Member member) {
        return ResponseEntity.ok(memberDashboardService.getMemberDashboard(member));
    }

    @GetMapping("/daily-running-distances")
    public ResponseEntity<List<MemberDailyDistanceResponse>> getMonthRunDistance(
            @RequestParam(name = "year") Integer year,
            @RequestParam(name = "month") Integer month,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberDashboardService.getMonthRunDistance(member, year, month));
    }

    @GetMapping("/daily-running-times")
    public ResponseEntity<List<MemberDailyRunningTimeResponse>> getMonthRunningTimes(
            @RequestParam(name = "year") Integer year,
            @RequestParam(name = "month") Integer month,
            @AuthMember Member member) {
        return ResponseEntity.ok(memberDashboardService.getMonthRunningTimes(member, year, month));
    }

    @GetMapping("/daily-tiles-counts")
    public ResponseEntity<List<MemberDailyTileResponse>> getMonthTiles(
            @RequestParam(name = "year") Integer year,
            @RequestParam(name = "month") Integer month,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberDashboardService.getMonthTiles(member, year, month));
    }

    @GetMapping("/daily-courses")
    public ResponseEntity<MemberCoursePoints> getMonthCompleteCourse(
            @RequestParam(name = "year") Integer year,
            @RequestParam(name = "month") Integer month,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberDashboardService.getMonthCompleteCourse(member, year, month));
    }

    @GetMapping("/tile-changes")
    public ResponseEntity<TileChangeRateResponse> getTileChangeRate(
            @RequestParam(name = "period") TileChangePeriod period,
            @AuthMember Member member) {
        return ResponseEntity.ok(memberDashboardService.getTileChangeRate(period, member));
    }
}
