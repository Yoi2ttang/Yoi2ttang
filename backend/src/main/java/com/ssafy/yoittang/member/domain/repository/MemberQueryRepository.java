package com.ssafy.yoittang.member.domain.repository;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.yoittang.member.domain.dto.response.MemberSummaryGetResponse;

public interface MemberQueryRepository {
	List<MemberSummaryGetResponse> searchMembers(
		LocalDate birthStart,
		LocalDate birthEnd,
		String keyword,
		Long next,
		Integer size
	);
}
