package com.ssafy.yoittang.member.domain.repository;

import static com.ssafy.yoittang.member.domain.QFollow.follow;
import static com.ssafy.yoittang.member.domain.QMember.member;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FollowQueryRepositoryImpl implements FollowQueryRepository {

    private final JPAQueryFactory queryFactory;


    @Override
    public List<Long> findFollowingMemberIds(Long memberId, String keyword, Long lastToId, int limit) {
        return queryFactory
                .select(follow.toMember)
                .from(follow)
                .join(member).on(follow.toMember.eq(member.memberId))
                .where(
                        follow.fromMember.eq(memberId),
                        nicknameStartsWith(keyword),
                        follow.isActive.isTrue(),
                        isInFollowingRange(lastToId)
                )
                .orderBy(follow.toMember.asc())
                .limit(limit + 1)
                .fetch();
    }

    @Override
    public List<Long> findFollowerMemberIds(Long memberId, String keyword, Long lastToId, int limit) {
        return queryFactory
                .select(follow.fromMember)
                .from(follow)
                .join(member).on(follow.fromMember.eq(member.memberId))
                .where(
                        follow.toMember.eq(memberId),
                        nicknameStartsWith(keyword),
                        follow.isActive.isTrue(),
                        isInFollowerRange(lastToId)
                )
                .orderBy(follow.fromMember.asc())
                .limit(limit + 1)
                .fetch();
    }

    private BooleanExpression isInFollowingRange(Long lastToId) {
        if (lastToId == null) {
            return null;
        }
        return follow.toMember.gt(lastToId);
    }

    private BooleanExpression isInFollowerRange(Long lastToId) {
        if (lastToId == null) {
            return null;
        }
        return follow.fromMember.gt(lastToId);
    }

    private BooleanExpression nicknameStartsWith(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return null;
        }
        return member.nickname.startsWithIgnoreCase(keyword);
    }
}
