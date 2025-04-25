package com.ssafy.yoittang.member.domain.dto.response;

public record MemberSummaryGetResponse(
	Long memberId,
	String nickname,
	String profileImageUrl
) {
}
