package com.ssafy.yoittang.tilehistory.domain.dto.response;

import com.ssafy.yoittang.common.model.PageInfoArgs;

import lombok.Builder;

@Builder
public record TileMemberRankingResponse(
        PageInfoArgs<TileHistoryMemberRankingResponse> pageInfoArgs
) { }
