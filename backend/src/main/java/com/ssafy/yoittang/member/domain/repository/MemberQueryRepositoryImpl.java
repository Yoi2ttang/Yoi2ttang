package com.ssafy.yoittang.member.domain.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.QFollow;
import com.ssafy.yoittang.member.domain.QMember;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;
import com.ssafy.yoittang.zordiac.domain.QZordiac;

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
        QMember qMember = QMember.member;
        return queryFactory
                .select(Projections.constructor(
                        MemberAutocompleteResponse.class,
                        qMember.memberId,
                        qMember.nickname
                ))
                .from(qMember)
                .where(
                        qMember.nickname.startsWith(keyword),
                        isInRange(lastMemberId)
                )
                .orderBy(qMember.memberId.asc())
                .limit(size + 1)  // +1 해서 hasNext 판별
                .fetch();
    }

    @Override
    public List<MemberSearchResponse> findSearchMembersByKeyword(
            String keyword,
            Long lastMemberId,
            Member member,
            int size
    ) {
        QMember qMember = QMember.member;
        QFollow qFollow = QFollow.follow;
        QZordiac qzordiac = QZordiac.zordiac;
        return queryFactory
                .select(Projections.constructor(
                        MemberSearchResponse.class,
                        qMember.memberId,
                        qMember.nickname,
                        qMember.profileImageUrl,
                        qzordiac.zordiacName,
                        qFollow.followId.isNotNull()
                ))
                .from(qMember)
                .leftJoin(qzordiac).on(qzordiac.zordiacId.eq(qMember.zordiacId))
                .leftJoin(qFollow)
                .on(qFollow.fromMember.eq(member.getMemberId())
                        .and(qFollow.toMember.eq(qMember.memberId)))
                .where(
                        qMember.nickname.startsWith(keyword),
                        isInRange(lastMemberId)
                )
                .orderBy(qMember.memberId.asc())
                .limit(size + 1)  // +1 해서 hasNext 판별
                .fetch();
    }

    @Override
    public List<MemberAutocompleteResponse> findMembersByIds(List<Long> ids) {
        QMember qMember = QMember.member;
        return queryFactory
                .select(Projections.constructor(
                        MemberAutocompleteResponse.class,
                        qMember.memberId,
                        qMember.nickname
                ))
                .from(qMember)
                .where(qMember.memberId.in(ids))
                .orderBy(qMember.memberId.asc())
                .fetch();
    }

    private BooleanExpression isInRange(Long lastMemberId) {
        QMember qMember = QMember.member;
        if (lastMemberId == null) {
            return null;
        }
        return qMember.memberId.gt(lastMemberId);
    }
}
