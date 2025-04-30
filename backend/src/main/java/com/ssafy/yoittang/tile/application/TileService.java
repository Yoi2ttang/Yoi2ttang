package com.ssafy.yoittang.tile.application;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.tile.domain.Tile;
import com.ssafy.yoittang.tile.domain.TileRepository;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;

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
            log.info("insert : wy{} size : {}", Character.toString(c), geoHashStringList.size());
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
                GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 6) + "%";

        return TileGetResponseWrapper.builder()
                .tileGetResponseList(tileRepository.getTile(null, geoHashString))
                .build();
    }

    public TileGetResponseWrapper getTile(Long zordiacId, Double lat, Double lng) {
        String geoHashString =
                GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 6) + "%";

        return TileGetResponseWrapper.builder()
                .tileGetResponseList(tileRepository.getTile(zordiacId, geoHashString))
                .build();
    }

}
