package com.ssafy.yoittang.tile.domain;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.yoittang.tile.domain.request.TwoGeoPoint;
import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileMemberClusterGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileTeamSituationResponse;

public interface TileQueryRepository {
    List<TileGetResponse> getTile(Long zodiacId, String geohash);

    List<TileGetResponse> getTile(Long zodiacId, List<String> geohashLikeList);

    List<TileGetResponse> getTile(TwoGeoPoint twoGeoPoint, Long zodiacId);

//    List<TileClusterGetResponse> getTileCluster(Long zodiacId, String geoHashString);

    List<TileMemberClusterGetResponse> getMemberTileCluster(
            String geoHashString,
            LocalDate localDate,
            Long memberId
    );

    List<TileGetResponse> getTileByCourseId(Long courseId, String geohash);

    List<TileGetResponse> getTilesInGeoHashes(List<String> geoHashList);
}
