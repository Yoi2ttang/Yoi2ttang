package com.ssafy.yoittang.tooktilehistory.domain.dto.response;

import java.util.List;

import lombok.Builder;

@Builder
public record TookTileHistoryResponse(
    Long zodiacId,
    List<TookTileHistoryGroupByPeriod> tookTileHistoryGroupByPeriodList
) { }
