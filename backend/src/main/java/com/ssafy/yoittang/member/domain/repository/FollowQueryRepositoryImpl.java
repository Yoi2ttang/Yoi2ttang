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
                .select(follow.to)
                .from(follow)
                .where(
                        follow.from.eq(memberId),
                        isInRange(lastToId)
                )
                .orderBy(follow.to.asc())
                .limit(limit + 1)
                .fetch();
    }

    @Override
    public List<Long> findFollowerMemberIds(Long memberId, Long lastToId, int limit) {
        return queryFactory
                .select(follow.from)
                .from(follow)
                .where(
                        follow.to.eq(memberId),
                        isInRange(lastToId)
                )
                .orderBy(follow.from.asc())
                .limit(limit + 1)
                .fetch();
    }

    private BooleanExpression isInRange(Long lastToId) {
        if (lastToId == null) {
            return null;
        }
        return follow.to.gt(lastToId);
    }
}
