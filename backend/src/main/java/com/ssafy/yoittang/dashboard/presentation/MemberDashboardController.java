package com.ssafy.yoittang.dashboard.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.dashboard.application.MemberDashboardService;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDashboardResponse;
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
}
