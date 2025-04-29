package com.ssafy.yoittang.tile.domain;

import java.util.List;

import com.ssafy.yoittang.tile.domain.response.TileGetResponse;

public interface TileQueryRepository {
    List<TileGetResponse> getTile(String geohash);
}
