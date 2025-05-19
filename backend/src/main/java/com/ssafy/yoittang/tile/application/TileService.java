package com.ssafy.yoittang.tile.application;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.Tile;
import com.ssafy.yoittang.tile.domain.TileRepository;
import com.ssafy.yoittang.tile.domain.request.TwoGeoPoint;
import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponseWrapper;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;
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

        //row 시작 끝, col 시작 끝을 가져옴
        int[][] levelDiff = new int[2][2];
        int changeLevel = 7;

        for (int i = 0; i < geoHashSWString.length() - 1; ++i) {
            if (geoHashSWString.charAt(i) != geoHashNEString.charAt(i)) {
                char swChar = geoHashSWString.charAt(i);
                char neChar = geoHashNEString.charAt(i);

                levelDiff = getStartEndInt(swChar, neChar, level[i  % 2], i);
                changeLevel = i;

//                char nextSWChar = geoHashSWString.charAt(i + 1);
//                char nextNEChar = geoHashNEString.charAt(i + 1);
//                levelDiff[i % 2] = getStartEndInt(nextSWChar, nextNEChar, level[(i + 1)  % 2], i + 1);

                break;
            }
        }

        for (int[] level : levelDiff) {
            log.info(Arrays.toString(level));
        }
        log.info(String.valueOf(changeLevel));

        List<String> likeList = new ArrayList<>();

        List<Integer> rowList = getIndexRange(
                levelDiff[0],
                level[changeLevel % 2].length,
                levelDiff[1][0] == levelDiff[1][1]
        );
        List<Integer> colList = getIndexRange(
                levelDiff[1],
                level[changeLevel % 2][0].length,
                levelDiff[0][0] == levelDiff[0][1]
        );

        log.info("rowList : " + rowList);
        log.info("colList : " + colList);

        String prefix = geoHashSWString.substring(0, changeLevel);

        log.info("init sb : "  + prefix);

        for (int row : rowList) {
            for (int col : colList) {
                StringBuilder sb = new StringBuilder(prefix);
                sb.append(level[changeLevel % 2][row][col]);
//                sb.append(level[(changeLevel + 1) % 2][col]);
//                if (changeLevel <= 5) {
//                    sb.append("%");
//                }
                likeList.add(sb.toString());
            }
        }

        log.info(Arrays.toString(new List[]{likeList}));


        return TileGetResponseWrapper.builder()
                .tileGetResponseList(tileRepository.getTile(zodiacId, likeList))
                .build();
    }

    private int[][] getStartEndInt(char swChar, char neChar, char[][] level, int idx) {
        int[][] result = new int[2][2];

        for (int i = 0; i < level.length; ++i) {
            for ( int j = 0; j < level[i].length; ++j) {
                if (level[i][j] == swChar) {
                    result[0][idx % 2] = idx % 2 == 0 ? j : i;
                    result[1][(idx + 1) % 2] = (idx + 1) % 2 == 0 ? j : i;
                    break;
                }
            }
        }

        for (int i = 0; i < level.length; ++i) {
            for ( int j = 0; j < level[i].length; ++j) {
                if (level[i][j] == neChar) {
                    result[0][(idx + 1) % 2] = idx % 2 == 0 ? j : i;
                    result[1][idx % 2] = (idx + 1) % 2 == 0 ? j : i;
                    break;
                }
            }
        }

        return result;
    }

    private List<Integer> getIndexRange(int[] levelDiff, int length, boolean isRowFixed) {
        List<Integer> result = new ArrayList<>();

        if (levelDiff[0] > levelDiff[1]) {
            //경계를 포함할 때
            for (int i = levelDiff[1]; i < length; ++i) {
                result.add(i);
            }
            for (int i = 0; i <= levelDiff[0]; ++i) {
                result.add(i);
            }
        } else if (levelDiff[0] == levelDiff[1] && isRowFixed) {
            //경겨를 포함하면서 인덱스가 같을 때
            for (int i = 0; i < length; ++i) {
                result.add(i);
            }
        } else {
            for (int i = levelDiff[0]; i <= levelDiff[1]; ++i) {
                result.add(i);
            }
        }

        return result;
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

        return TileClusterGetResponseWrapper.builder()
                .tileClusterGetResponseList(tileRepository.getTileCluster(
                        null,
                        getGeoHashStringByZoomLevel(lat, lng, zoomLevel))
                )
                .build();
    }

    public TileClusterGetResponseWrapper getTileCluster(Long zodiacId, Double lat, Double lng, Integer zoomLevel) {

//        checkZodiacId(zodiacId);

        return TileClusterGetResponseWrapper.builder()
                .tileClusterGetResponseList(tileRepository.getTileCluster(
                        zodiacId,
                        getGeoHashStringByZoomLevel(lat, lng, zoomLevel))
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
        } else {
            precision = basePrecision - ((baseZoom - zoomLevel) / 2);
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
