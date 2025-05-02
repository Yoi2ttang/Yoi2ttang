package com.ssafy.yoittang.tilehistory.domain.query;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.yoittang.tile.domain.request.PersonalTileGetRequest;
import com.ssafy.yoittang.tile.domain.response.PersonalTileGetResponse;

public interface TileHistoryQueryRepository {
    List<PersonalTileGetResponse> getTileHistoryWithQuery(
            PersonalTileGetRequest personalTileGetRequest,
            String geoHashString
    );

    int countDistinctGeohashLastMonth(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}
