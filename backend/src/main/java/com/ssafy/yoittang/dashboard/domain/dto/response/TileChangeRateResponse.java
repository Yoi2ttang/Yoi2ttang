package com.ssafy.yoittang.dashboard.domain.dto.response;

import com.ssafy.yoittang.dashboard.domain.ChangeDirection;

public record TileChangeRateResponse(
        Double changeRate,
        ChangeDirection changeDirection
) {
}
