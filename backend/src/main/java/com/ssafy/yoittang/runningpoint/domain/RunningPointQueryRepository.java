package com.ssafy.yoittang.runningpoint.domain;

public interface RunningPointQueryRepository {
    Double findTotalDistanceByMemberId(Long memberId);
}
