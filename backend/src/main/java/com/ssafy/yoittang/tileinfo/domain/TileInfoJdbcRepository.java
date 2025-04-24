package com.ssafy.yoittang.tileinfo.domain;

import java.util.List;

public interface TileInfoJdbcRepository {
    void bulkInsert(List<TileInfo> tileInfoList);
}
