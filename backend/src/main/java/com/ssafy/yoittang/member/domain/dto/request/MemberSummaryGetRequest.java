package com.ssafy.yoittang.member.domain.dto.request;

import java.time.LocalDate;

public record MemberSummaryGetRequest(
	LocalDate birthStart,
	LocalDate birthEnd,
	String keyword,
	Long next,
	Integer size
) {
}
