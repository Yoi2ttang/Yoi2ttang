package com.ssafy.yoittang.member.domain.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.course.domain.dto.response.CourseClearMemberResponse;
import com.ssafy.yoittang.member.domain.QFollow;
import com.ssafy.yoittang.member.domain.QMember;
import com.ssafy.yoittang.member.domain.dto.response.FollowResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;
import com.ssafy.yoittang.zodiac.domain.QZodiac;

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
            Long memberId,
            int size
    ) {
        QMember qMember = QMember.member;
        QFollow qFollow = QFollow.follow;
        QZodiac qzodiac = QZodiac.zodiac;
        return queryFactory
                .select(Projections.constructor(
                        MemberSearchResponse.class,
                        qMember.memberId,
                        qMember.nickname,
                        qMember.profileImageUrl,
                        qzodiac.zodiacName,
                        qFollow.followId.isNotNull()
                ))
                .from(qMember)
                .leftJoin(qzodiac).on(qzodiac.zodiacId.eq(qMember.zodiacId))
                .leftJoin(qFollow)
                .on(qFollow.fromMember.eq(memberId)
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
        QZodiac qzodiac = QZodiac.zodiac;
        QFollow qFollow = QFollow.follow;
        return queryFactory
                .select(Projections.constructor(
                        MemberAutocompleteResponse.class,
                        qMember.memberId,
                        qMember.nickname,
                        qMember.profileImageUrl,
                        qzodiac.zodiacName,
                        qFollow.followId.isNotNull()
                ))
                .from(qMember)
                .join(qzodiac).on(qzodiac.zodiacId.eq(qMember.zodiacId))
                .leftJoin(qFollow)
                .on(qFollow.fromMember.eq(qMember.memberId)
                        .and(qFollow.toMember.eq(qMember.memberId)))
                .where(qMember.memberId.in(ids))
                .orderBy(qMember.memberId.asc())
                .fetch();
    }

    @Override
    public List<FollowResponse> findFollowingByIds(List<Long> ids, Long memberId) {
        QMember qMember = QMember.member;
        QZodiac qzodiac = QZodiac.zodiac;
        QFollow qFollow = QFollow.follow;

        Expression<Boolean> isFollowExpr = new CaseBuilder()
                .when(qMember.memberId.eq(memberId))
                .then(Expressions.nullExpression(Boolean.class))  // 자기 자신일 때는 null 반환
                .otherwise(
                        JPAExpressions
                                .selectOne()
                                .from(qFollow)
                                .where(
                                        qFollow.fromMember.eq(memberId),
                                        qFollow.toMember.eq(qMember.memberId),
                                        qFollow.isActive.isTrue()
                                )
                                .exists()
                );

        return queryFactory
                .select(Projections.constructor(
                        FollowResponse.class,
                        qMember.memberId,
                        qMember.nickname,
                        qMember.profileImageUrl,
                        qzodiac.zodiacName,
                        isFollowExpr
                ))
                .from(qMember)
                .join(qzodiac).on(qzodiac.zodiacId.eq(qMember.zodiacId))
                .where(qMember.memberId.in(ids))
                .orderBy(qMember.memberId.asc())
                .fetch();
    }

    @Override
    public List<FollowResponse> findFollowerByIds(List<Long> ids, Long memberId) {
        QMember qMember = QMember.member;
        QZodiac qzodiac = QZodiac.zodiac;
        QFollow qFollow = QFollow.follow;

        Expression<Boolean> isFollowExpr = new CaseBuilder()
                .when(qMember.memberId.eq(memberId))
                .then(Expressions.nullExpression(Boolean.class))  // 자기 자신일 때는 null 반환
                .otherwise(
                        JPAExpressions
                                .selectOne()
                                .from(qFollow)
                                .where(
                                        qFollow.fromMember.eq(memberId),
                                        qFollow.toMember.eq(qMember.memberId),
                                        qFollow.isActive.isTrue()
                                )
                                .exists()
                );

        return queryFactory
                .select(Projections.constructor(
                        FollowResponse.class,
                        qMember.memberId,
                        qMember.nickname,
                        qMember.profileImageUrl,
                        qzodiac.zodiacName,
                        isFollowExpr
                ))
                .from(qMember)
                .join(qzodiac).on(qzodiac.zodiacId.eq(qMember.zodiacId))
                .where(qMember.memberId.in(ids))
                .orderBy(qMember.memberId.asc())
                .fetch();
    }

    @Override
    public List<CourseClearMemberResponse> findCourseClearMembersByIds(List<Long> memberIds) {
        if (memberIds == null || memberIds.isEmpty()) {
            return List.of();
        }

        QMember member = QMember.member;

        return queryFactory
                .select(Projections.constructor(
                        CourseClearMemberResponse.class,
                        member.memberId,
                        member.nickname,
                        member.profileImageUrl
                ))
                .from(member)
                .where(member.memberId.in(memberIds))
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
