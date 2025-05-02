package com.ssafy.yoittang.tile.domain;

import java.util.List;

import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileGetResponse;

public interface TileQueryRepository {
    List<TileGetResponse> getTile(Long zordiacId, String geohash);

    List<TileClusterGetResponse> getTileCluster(Long zordiacId, String geoHashString);
}
