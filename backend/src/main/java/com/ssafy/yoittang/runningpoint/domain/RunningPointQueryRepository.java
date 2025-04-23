package com.ssafy.yoittang.runningpoint.domain;

import com.ssafy.yoittang.runningpoint.domain.dto.reseponse.TopRunningPointResponse;

public interface RunningPointQueryRepository {
    TopRunningPointResponse getTopRunningPointByRunningIdAndMemberId(Long runningId, Long memberId);
}
