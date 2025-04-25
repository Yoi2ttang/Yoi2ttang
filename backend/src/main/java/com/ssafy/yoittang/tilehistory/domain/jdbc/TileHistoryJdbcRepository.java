package com.ssafy.yoittang.tilehistory.domain.jdbc;

import java.util.List;

import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;

public interface TileHistoryJdbcRepository {
    void bulkInsert(List<TileHistoryRedis> tileHistoryRedisList);
}
