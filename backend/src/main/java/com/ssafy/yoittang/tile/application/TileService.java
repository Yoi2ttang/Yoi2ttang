package com.ssafy.yoittang.tile.application;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.Tile;
import com.ssafy.yoittang.tile.domain.TileRepository;
import com.ssafy.yoittang.tile.domain.request.TwoGeoPoint;
import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponseWrapper;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;
import com.ssafy.yoittang.tile.domain.response.TileMemberClusterGetWrapperResponse;
import com.ssafy.yoittang.tile.domain.response.TilePreviewResponse;
import com.ssafy.yoittang.tile.domain.response.TileRankingResponse;
import com.ssafy.yoittang.tile.domain.response.TileSituationResponse;
import com.ssafy.yoittang.tile.domain.response.TileTeamSituationResponse;

import ch.hsr.geohash.BoundingBox;
import ch.hsr.geohash.GeoHash;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@RequiredArgsConstructor
public class TileService {

    private final TileRepository tileRepository;

    String[] jeju = {"wvc", "wvf"};

    char[] level3 = {'b', 'c', 'f', 'g',
        '8', '9', 'd', 'e', 's', 't', '2', '3', '6', '7', 'k', '0', '1', '4', '5', 'h'};
    char[][][] level = {
            {
                {'b', 'c', 'f', 'g', 'u', 'v', 'f', 'z'},
                {'8', '9', 'd', 'e', 's', 't', 'w', 'x'},
                {'2', '3', '6', '7', 'k', 'm', 'q', 'r'},
                {'0', '1', '4', '5', 'h', 'j', 'n', 'p'}
            },
            {
                {'p', 'r', 'x', 'z'},
                {'n', 'q', 'w', 'y'},
                {'j', 'm', 't', 'v'},
                {'h', 'k', 's', 'u'},
                {'5', '7', 'e', 'g'},
                {'4', '6', 'd', 'f'},
                {'1', '3', '9', 'c'},
                {'0', '2', '8', 'b'}
            }
    };

    char[] geohashBase32 = {
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    };
    @Transactional
    public void createTile(int level) {

        if (level < 3) {
            throw new BadRequestException(ErrorCode.TOO_LARGE_GEOHASH);
        }

        ArrayList<String> geoHashStringList = new ArrayList<>();

        //제주도 위치만 따로 넣음
        for (String j : jeju) {
            char[] chars = new char[level];

            for (int i = 0; i < j.length(); ++i) {
                chars[i] = j.charAt(i);
            }

            getGeoHashString(geoHashStringList, chars, j.length(), level);
        }


        // 남한 데이터 넣기
        for (char c : level3) {
            char[] chars = new char[level];
            chars[0] = 'w';
            chars[1] = 'y';
            chars[2] = c;

            getGeoHashString(geoHashStringList, chars, 3, level);
            TileService.log.info("insert : wy{} size : {}", Character.toString(c), geoHashStringList.size());
            insertBulk(geoHashStringList);
            geoHashStringList = new ArrayList<>();
        }
    }

    private void getGeoHashString(
            ArrayList<String> geoHashStringList,
            char[] result,
            int start,
            int level
    ) {
        if (start == level) {
            geoHashStringList.add(String.valueOf(result));
            return;
        }

        for (char c : geohashBase32) {
            result[start] = c;
            getGeoHashString(geoHashStringList, result, start + 1, level);
        }
    }

    void insertBulk(ArrayList<String> geoHashStringList) {

        ArrayList<Tile> tileArrayList = new ArrayList<>();

        for (String geoHashString : geoHashStringList) {
            GeoHash geoHash = GeoHash.fromGeohashString(geoHashString);
            BoundingBox boundingBox = geoHash.getBoundingBox();

            double latNorth = boundingBox.getNorthLatitude();
            double latSouth = boundingBox.getSouthLatitude();
            double lngEast = boundingBox.getEastLongitude();
            double lngWest = boundingBox.getWestLongitude();

            tileArrayList.add(Tile.builder()
                            .geoHash(geoHashString)
                            .latNorth(latNorth)
                            .latSouth(latSouth)
                            .lngEast(lngEast)
                            .lngWest(lngWest)
                    .build());
        }

        tileRepository.bulkInsert(tileArrayList);
    }

    public TileGetResponseWrapper getTile(Double lat, Double lng) {
        String geoHashString =
                GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 5) + "%";

        return TileGetResponseWrapper.builder()
                .tileGetResponseList(tileRepository.getTile(null, geoHashString))
                .build();
    }

    public TileGetResponseWrapper getTile(Long zodiacId, TwoGeoPoint twoGeoPoint) {

        GeoPoint sw = twoGeoPoint.sw();
        GeoPoint ne = twoGeoPoint.ne();

        String geoHashSWString = GeoHash.geoHashStringWithCharacterPrecision(sw.lat(), sw.lng(), 7);
        String geoHashNEString = GeoHash.geoHashStringWithCharacterPrecision(ne.lat(), ne.lng(), 7);

        log.info("swString : " + geoHashSWString);
        log.info("neString : " + geoHashNEString);

        Set<String> likeSet =  getLevel6Geohashes(sw.lat(), sw.lng(), ne.lat(), ne.lng());
        List<String> likeList = likeSet.stream().toList();

        for ( String like : likeList) {
            log.info(like);
        }

        return TileGetResponseWrapper.builder()
                .tileGetResponseList(tileRepository.getTile(zodiacId, likeList))
                .build();
    }

    private Set<String> getLevel6Geohashes(
            double swLat, double swLon,
            double neLat, double neLon) {

        final int precision = 6;
        Set<String> hashes = new HashSet<>();

        // SW 지점에서 level-6 hash 객체 얻어서, 하나의 셀 크기(위도·경도 범위) 계산
        GeoHash swHash6 = GeoHash.withCharacterPrecision(swLat, swLon, 7);
        double latStep = swHash6.getBoundingBox().getLatitudeSize();
        double lonStep = swHash6.getBoundingBox().getLongitudeSize();

        log.info(String.valueOf(latStep));
        log.info(String.valueOf(lonStep));

        // 위도 남->북, 경도 서->동 순회
        for (double lat = swLat; lat <= neLat; lat += latStep) {
            for (double lon = swLon; lon <= neLon; lon += lonStep) {
                // 각 격자점의 level-6 geohash 생성
                String hash6 = GeoHash.geoHashStringWithCharacterPrecision(lat, lon, precision);
                hashes.add(hash6);
            }
        }

        return hashes;
    }


    public TileGetResponseWrapper getTile(Long zodiacId, Double lat, Double lng) {

//        checkZodiacId(zodiacId);

        String geoHashString =
                GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 5) + "%";

        return TileGetResponseWrapper.builder()
                .tileGetResponseList(tileRepository.getTile(zodiacId, geoHashString))
                .build();
    }

    public TileClusterGetResponseWrapper getTileCluster(Double lat, Double lng, Integer zoomLevel) {

        if (zoomLevel <= 6) {
            return null;
        }

        return TileClusterGetResponseWrapper.builder()
                .tileClusterGetResponseList(tileRepository.getTileCluster(
                        null,
                        getGeoHashStringByZoomLevel(lat, lng, zoomLevel))
                )
                .build();
    }

    public TileClusterGetResponseWrapper getTileCluster(Long zodiacId, Double lat, Double lng, Integer zoomLevel) {

//        checkZodiacId(zodiacId);

        if (zoomLevel <= 6) {
            return null;
        }


        return TileClusterGetResponseWrapper.builder()
                .tileClusterGetResponseList(tileRepository.getTileCluster(
                        zodiacId,
                        getGeoHashStringByZoomLevel(lat, lng, zoomLevel))
                )
                .build();
    }

    public TileMemberClusterGetWrapperResponse getMemberCluster(
            Double lat,
            Double lng,
            LocalDate localDate,
            Integer zoomLevel,
            Member member
    ) {
        if (zoomLevel <= 6) {
            return null;
        }

        return TileMemberClusterGetWrapperResponse.builder()
                .tileClusterGetResponseList(
                        tileRepository.getMemberTileCluster(
                                    getGeoHashStringByZoomLevel(lat, lng, zoomLevel),
                                    localDate,
                                    member.getMemberId()
                                )
                )
                .build();
    }


    public TileSituationResponse getTileSituation(Long zodiacId) {

//        checkZodiacId(zodiacId);

        List<TileTeamSituationResponse> tileSituationList =  tileRepository.getTileSituation();

        TileTeamSituationResponse myTeam = tileSituationList.stream()
                .filter(t -> t.zodiacId().equals(zodiacId))
                .findFirst()
                .orElse(null);

        Long rankGap = myTeam != null
                ? tileSituationList.get(0).tileCount() - Objects.requireNonNull(myTeam).tileCount()
                : null;

        return TileSituationResponse.builder()
                .No1Team(tileSituationList.get(0))
                .myTeam(myTeam)
                .rankGap(rankGap)
                .build();

    }

    public TileRankingResponse getTeamRanking() {

        return TileRankingResponse.builder()
                .tileTeamSituationResponseList(tileRepository.getTileSituation())
                .build();
    }

    public TilePreviewResponse getRankingPreview(
            Long zodiacId,
            Integer limit
    ) {
//        checkZodiacId(zodiacId);
        int size = checkLimit(limit);

        List<TileTeamSituationResponse> tileTeamSituationResponseList = tileRepository.getTileSituation();

        Integer myTeamRanking = tileTeamSituationResponseList.stream()
                .filter(r -> r.zodiacId().equals(zodiacId))
                .map(TileTeamSituationResponse::rank)
                .findFirst()
                .orElse(null);

        List<TileTeamSituationResponse> previewList =
            tileTeamSituationResponseList.subList(0, Math.min(size, tileTeamSituationResponseList.size()));

        return TilePreviewResponse.builder()
                .tileTeamSituationResponseList(previewList)
                .myTeamRanking(myTeamRanking)
                .build();
    }


    public String getGeoHashStringByZoomLevel(
            Double lat,
            Double lng,
            Integer zoomLevel
    ) {
        return GeoHash.geoHashStringWithCharacterPrecision(lat, lng, getBasePrecisionByZoomLevel(zoomLevel));
    }

    // 프론트랑 얘기해서 zoomlevel 에 따른 정밀도를 같이 결정해야 함
    public int getBasePrecisionByZoomLevel(Integer zoomLevel) {
        int baseZoom = 16;
        int basePrecision = 6;

        int precision;
        if (zoomLevel >= baseZoom) {
            precision = basePrecision + ((zoomLevel - baseZoom) / 2);
        } else if (zoomLevel < basePrecision) {
            precision = 3;
        } else {
            precision = (int) (basePrecision - Math.ceil(((double) (baseZoom - zoomLevel) / 2) ));
        }

        return Math.max(1, Math.min(precision, 6)); // precision 범위 제한 1~6
    }

//    public void checkZodiacId(Long zodiacId) {
//        if (zodiacId != null &&  1L <= zodiacId && zodiacId <= 12L) {
//            return;
//        }
//        throw new NotFoundException(ErrorCode.NOT_FOUND_ZORDIAC);
//    }

    public int checkLimit(Integer limit) {
        if (limit == null) {
            return 0;
        }

        if ( 0 <= limit && limit <= 12 ) {
            return limit;
        }
        throw new BadRequestException(ErrorCode.INVALID_REQUEST);
    }

}
