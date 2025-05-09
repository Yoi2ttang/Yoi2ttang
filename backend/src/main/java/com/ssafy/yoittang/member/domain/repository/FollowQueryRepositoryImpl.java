package com.ssafy.yoittang.member.domain.repository;

import static com.ssafy.yoittang.member.domain.QFollow.follow;

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
    public List<Long> findFollowingMemberIds(Long memberId, Long lastToId, int limit) {
        return queryFactory
                .select(follow.toMember)
                .from(follow)
                .where(
                        follow.fromMember.eq(memberId),
                        isInRange(lastToId)
                )
                .orderBy(follow.toMember.asc())
                .limit(limit + 1)
                .fetch();
    }

    @Override
    public List<Long> findFollowerMemberIds(Long memberId, Long lastToId, int limit) {
        return queryFactory
                .select(follow.fromMember)
                .from(follow)
                .where(
                        follow.toMember.eq(memberId),
                        isInRange(lastToId)
                )
                .orderBy(follow.fromMember.asc())
                .limit(limit + 1)
                .fetch();
    }

    private BooleanExpression isInRange(Long lastToId) {
        if (lastToId == null) {
            return null;
        }
        return follow.toMember.gt(lastToId);
    }
}
