package com.ssafy.yoittang.member.domain.repository;

import static com.ssafy.yoittang.member.domain.QMember.*;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.member.domain.dto.response.MemberSummaryGetResponse;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepositoryImpl implements MemberQueryRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<MemberSummaryGetResponse> searchMembers(LocalDate birthStart, LocalDate birthEnd, String keyword,
		Long next, Integer size) {

		return jpaQueryFactory
			.select(Projections.constructor(MemberSummaryGetResponse.class,
				member.memberId,
				member.nickname,
				member.profileImageUrl
			))
			.from(member)
			.where(
				birthStart != null && birthEnd != null
					? member.birthDate.between(birthStart, birthEnd)
					: birthStart != null
					? member.birthDate.goe(birthStart)
					: birthEnd != null
					? member.birthDate.loe(birthEnd)
					: null,
				keyword != null ? member.nickname.containsIgnoreCase(keyword) : null,
				next != null ? member.memberId.lt(next) : null
			)
			.orderBy(member.memberId.desc())
			.limit(size + 1)
			.fetch();
	}
}
