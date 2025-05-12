package com.ssafy.yoittang.tilehistory.domain.jdbc;

import java.util.List;

import com.ssafy.yoittang.tilehistory.domain.dto.reqeust.TileMemberRankingRequest;
import com.ssafy.yoittang.tilehistory.domain.dto.response.TileMemberRankingResponse;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;

public interface TileHistoryJdbcRepository {
    void bulkInsert(List<TileHistoryRedis> tileHistoryRedisList);

    TileMemberRankingResponse getTileMemberRankingResponse(
            Long zodiacId,
            TileMemberRankingRequest tileMemberRankingRequest
    );
}
