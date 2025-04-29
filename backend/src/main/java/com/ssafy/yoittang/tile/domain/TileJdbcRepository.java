package com.ssafy.yoittang.tile.domain;

import java.util.List;

public interface TileJdbcRepository {
    void bulkInsertWithGeoHash(List<String> geohashList);
}
