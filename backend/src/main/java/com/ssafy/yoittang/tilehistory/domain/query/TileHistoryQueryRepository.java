package com.ssafy.yoittang.tilehistory.domain.query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyTileResponse;
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

    List<MemberDailyTileResponse> findDailyTileCountsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    Map<Long, Long> countVisitedCourseTilesByMember(Long memberId, List<Long> courseIds);

    Map<Long, Long> countVisitedTilesByCourseAndMember(Long courseId, List<Long> memberIds);
}
