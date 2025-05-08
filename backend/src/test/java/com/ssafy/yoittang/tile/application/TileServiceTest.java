package com.ssafy.yoittang.tile.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.TileRepository;
import com.ssafy.yoittang.tile.domain.response.TileGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;

import ch.hsr.geohash.BoundingBox;
import ch.hsr.geohash.GeoHash;

@ExtendWith(MockitoExtension.class)
public class TileServiceTest {

    @InjectMocks
    private TileService tileService;

    @Mock
    private TileRepository tileRepository;

    private final Double lat = 37.501161;
    private final Double lng = 127.039668;
    private final char[] geohashBase32 = {
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    };

    // getTile 성공
    @Test
    public void getTileSuccess() {
        // given
        double lat = 37.501161;
        double lng = 127.039668;
        String geoHashPrefix = GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 6);
        String geoHashString = geoHashPrefix + "%";

        List<TileGetResponse> responseList = new ArrayList<>();

        for (int i = 0; i < geohashBase32.length; ++i) {
            String newGeoHashString = geoHashPrefix + geohashBase32[i];
            BoundingBox box = GeoHash.fromGeohashString(newGeoHashString).getBoundingBox();

            responseList.add(new TileGetResponse(
                    newGeoHashString,
                    (long) (i % 12) + 1,
                    new GeoPoint(box.getSouthLatitude(), box.getWestLongitude()),
                    new GeoPoint(box.getNorthLatitude(), box.getEastLongitude())
            ));
        }

        when(tileRepository.getTile(isNull(), eq(geoHashString))).thenReturn(responseList);

        // when
        TileGetResponseWrapper response = tileService.getTile(lat, lng);

        // then
        assertThat(response).isNotNull();
        assertThat(response.tileGetResponseList()).hasSize(responseList.size());
        assertThat(response.tileGetResponseList()).containsExactlyElementsOf(responseList);

        verify(tileRepository).getTile(isNull(), eq(geoHashString));
    }

    //존재하지 않는 공간은 빈 리스트
    @Test
    public void getTileSuccessNull() {
        // given
        //40.71870, -74.00878 뉴욕
        double lat = 40.71870;
        double lng = -74.00878;
        String geoHashPrefix = GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 6);
        String geoHashString = geoHashPrefix + "%";

        List<TileGetResponse> responseList = new ArrayList<>();

        when(tileRepository.getTile(isNull(), eq(geoHashString))).thenReturn(responseList);

        // when
        TileGetResponseWrapper response = tileService.getTile(lat, lng);

        // then
        assertThat(response).isNotNull();
        assertThat(response.tileGetResponseList().size()).isEqualTo(0);

        verify(tileRepository).getTile(isNull(), eq(geoHashString));
    }

}
