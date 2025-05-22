package com.ssafy.yoittang.member.domain.repository;

import java.util.List;

public interface FollowQueryRepository {
    List<Long> findFollowingMemberIds(Long memberId, String keyword, Long lastToId, int limit);

    List<Long> findFollowerMemberIds(Long memberId, String keyword, Long lastToId, int limit);
}
