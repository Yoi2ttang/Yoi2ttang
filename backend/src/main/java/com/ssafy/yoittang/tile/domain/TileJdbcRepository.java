package com.ssafy.yoittang.tile.domain;

import java.util.List;

public interface TileJdbcRepository {
    void bulkInsert(List<Tile> tileList);

    void updateTileWithTileHistory();
}
