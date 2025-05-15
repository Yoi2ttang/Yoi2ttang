package com.ssafy.yoittang.tile.domain;

import java.util.List;

import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileTeamSituationResponse;

public interface TileQueryRepository {
    List<TileGetResponse> getTile(Long zodiacId, String geohash);

    List<TileClusterGetResponse> getTileCluster(Long zodiacId, String geoHashString);

    List<TileGetResponse> getTileByCourseId(Long courseId, String geohash);

    List<TileGetResponse> getTilesInGeoHashes(List<String> geoHashList);
}
