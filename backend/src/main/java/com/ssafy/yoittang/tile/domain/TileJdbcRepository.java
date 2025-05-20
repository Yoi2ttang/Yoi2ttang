package com.ssafy.yoittang.tile.domain;

import java.util.List;

import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponse;

public interface TileJdbcRepository {
    void bulkInsert(List<Tile> tileList);

    void updateTileWithTileHistory();

    List<TileClusterGetResponse> getTileCluster(Long zodiacId, String geoHashPrefix);
}
