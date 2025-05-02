package com.ssafy.yoittang.tile.domain.response;

import lombok.Builder;

@Builder
public record TileSituationResponse(
        TileTeamSituationResponse No1Team,
        TileTeamSituationResponse myTeam,
        Long rankGap
) { }
