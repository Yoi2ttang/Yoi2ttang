package com.ssafy.yoittang.tilehistory.domain.dto.response;

import lombok.Builder;

@Builder
public record TileHistoryMemberRankingResponse(
        Integer rank,
        Long memberId,
        String nickname,
        Long tileCount
) { }
