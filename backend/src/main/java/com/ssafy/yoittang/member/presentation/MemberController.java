package com.ssafy.yoittang.member.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.member.application.MemberService;
import com.ssafy.yoittang.member.domain.dto.request.MemberSummaryGetRequest;
import com.ssafy.yoittang.member.domain.dto.response.MemberSummaryGetResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	@GetMapping("/list")
	public ResponseEntity<PageInfo<MemberSummaryGetResponse>> searchMembers(
		@RequestBody MemberSummaryGetRequest request) {
		return ResponseEntity.ok(memberService.searchMembers(request));
	}
}
