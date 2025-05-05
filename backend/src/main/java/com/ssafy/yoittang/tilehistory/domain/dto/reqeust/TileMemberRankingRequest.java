package com.ssafy.yoittang.tilehistory.domain.dto.reqeust;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.common.exception.IllegalArgumentException;

public record TileMemberRankingRequest(
        LocalDate date,
        Long lastCount,
        Long lastMemberId,
        Integer size
) {
    public TileMemberRankingRequest {
        boolean hasLastCount = lastCount != null;
        boolean hasLastMemberId = lastMemberId != null;

        if (hasLastCount ^ hasLastMemberId) {
            throw new IllegalArgumentException(ErrorCode.MUST_BOTH_NULL);
        }
    }
}
