package com.ssafy.yoittang.member.domain.repository;

import static com.ssafy.yoittang.member.domain.QMember.member;
import static com.ssafy.yoittang.zordiac.domain.QZordiac.zordiac;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;

import lombok.RequiredArgsConstructor;


@Repository
@RequiredArgsConstructor
public class MemberQueryRepositoryImpl implements MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<MemberAutocompleteResponse> findAutocompleteMembersByKeyword(
            String keyword,
            Long lastMemberId,
            int size
    ) {
        return queryFactory
                .select(Projections.constructor(
                        MemberAutocompleteResponse.class,
                        member.memberId,
                        member.nickname
                ))
                .from(member)
                .where(
                        member.nickname.startsWith(keyword),
                        isInRange(lastMemberId)
                )
                .orderBy(member.memberId.asc())
                .limit(size + 1)  // +1 해서 hasNext 판별
                .fetch();
    }

    @Override
    public List<MemberSearchResponse> findSearchMembersByKeyword(String keyword, Long lastMemberId, int size) {
        return queryFactory
                .select(Projections.constructor(
                        MemberSearchResponse.class,
                        member.memberId,
                        member.nickname,
                        member.profileImageUrl,
                        zordiac.zordiacName
                ))
                .from(member)
                .leftJoin(zordiac).on(zordiac.zordiacId.eq(member.zordiacId))
                .where(
                        member.nickname.startsWith(keyword),
                        isInRange(lastMemberId)
                )
                .orderBy(member.memberId.asc())
                .limit(size + 1)  // +1 해서 hasNext 판별
                .fetch();
    }

    @Override
    public List<MemberAutocompleteResponse> findMembersByIds(List<Long> ids) {
        return queryFactory
                .select(Projections.constructor(
                        MemberAutocompleteResponse.class,
                        member.memberId,
                        member.nickname
                ))
                .from(member)
                .where(member.memberId.in(ids))
                .orderBy(member.memberId.asc())
                .fetch();
    }

    private BooleanExpression isInRange(Long lastMemberId) {
        if (lastMemberId == null) {
            return null;
        }
        return member.memberId.gt(lastMemberId);
    }
}
