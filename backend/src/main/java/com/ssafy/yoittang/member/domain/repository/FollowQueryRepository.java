package com.ssafy.yoittang.member.domain.repository;

import java.util.List;

public interface FollowQueryRepository {
    List<Long> findFollowingMemberIds(Long memberId, Long lastToId, int limit);

    List<Long> findFollowerMemberIds(Long memberId, Long lastToId, int limit);
}
