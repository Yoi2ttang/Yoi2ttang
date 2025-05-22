package com.ssafy.yoittang.tile.domain.response;

import lombok.Builder;

@Builder
public record TileTeamSituationResponse(
        Integer rank,
        Long zodiacId,
        Long tileCount
) { }
