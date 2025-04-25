package com.ssafy.yoittang.member.application;

import org.springframework.stereotype.Service;

import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.member.domain.dto.request.MemberSummaryGetRequest;
import com.ssafy.yoittang.member.domain.dto.response.MemberSummaryGetResponse;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final MemberRepository memberRepository;

	public PageInfo<MemberSummaryGetResponse> searchMembers(MemberSummaryGetRequest request) {
		return memberRepository.searchMembers(request);
	}
}
