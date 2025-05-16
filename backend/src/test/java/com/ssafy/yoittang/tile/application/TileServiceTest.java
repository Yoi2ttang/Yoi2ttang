package com.ssafy.yoittang.tile.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.TileRepository;
import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponseWrapper;
import com.ssafy.yoittang.tile.domain.response.TileGetResponse;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;
import com.ssafy.yoittang.tile.domain.response.TilePreviewResponse;
import com.ssafy.yoittang.tile.domain.response.TileRankingResponse;
import com.ssafy.yoittang.tile.domain.response.TileSituationResponse;
import com.ssafy.yoittang.tile.domain.response.TileTeamSituationResponse;

import ch.hsr.geohash.BoundingBox;
import ch.hsr.geohash.GeoHash;



@ExtendWith(MockitoExtension.class)
public class TileServiceTest {

    private static final Logger log = LoggerFactory.getLogger(TileServiceTest.class);
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
        String geoHashPrefix = GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 5);
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

    @Test
    @DisplayName("존재하지 않는 공간은 빈 리스트")
    public void getTileSuccessNull() {
        // given
        //40.71870, -74.00878 뉴욕
        double lat = 40.71870;
        double lng = -74.00878;
        String geoHashPrefix = GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 5);
        String geoHashString = geoHashPrefix + "%";

        List<TileGetResponse> responseList = new ArrayList<>();

        when(tileRepository.getTile(isNull(), eq(geoHashString))).thenReturn(responseList);

        // when
        TileGetResponseWrapper response = tileService.getTile(lat, lng);

        // then
        assertThat(response).isNotNull();
        assertThat(response.tileGetResponseList().size()).isEqualTo(0);
    }

    @Test
    @DisplayName("getTile 성공")
    public void getTileSuccessWithZodiacId() {
        // given
        double lat = 37.501161;
        double lng = 127.039668;
        String geoHashPrefix = GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 5);
        String geoHashString = geoHashPrefix + "%";

        Long zodiacId = 3L;

        List<TileGetResponse> responseList = new ArrayList<>();

        for (int i = 0; i < geohashBase32.length; ++i) {
            if ((i % 12 + 1) == 3 ) {
                String newGeoHashString = geoHashPrefix + geohashBase32[i];
                BoundingBox box = GeoHash.fromGeohashString(newGeoHashString).getBoundingBox();

                responseList.add(new TileGetResponse(
                        newGeoHashString,
                        zodiacId,
                        new GeoPoint(box.getSouthLatitude(), box.getWestLongitude()),
                        new GeoPoint(box.getNorthLatitude(), box.getEastLongitude())
                ));
            }
        }

        when(tileRepository.getTile(eq(zodiacId), eq(geoHashString))).thenReturn(responseList);

        // when
        TileGetResponseWrapper response = tileService.getTile(zodiacId, lat, lng);

        // then
        assertThat(response).isNotNull();
        assertThat(response.tileGetResponseList()).hasSize(responseList.size());
        assertThat(response.tileGetResponseList()).containsExactlyElementsOf(responseList);

    }

    @Test
    @DisplayName("존재하지 않는 간지로 인해 빈 리스트 리턴")
    public void getTileSuccessNull1ithZodiacId() {
        // given
        double lat = 37.501161;
        double lng = 127.039668;
        String geoHashPrefix = GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 5);
        String geoHashString = geoHashPrefix + "%";

        Long zodiacId = 18L;
        List<TileGetResponse> responseList = new ArrayList<>();

        when(tileRepository.getTile(eq(zodiacId), eq(geoHashString))).thenReturn(responseList);

        // when
        TileGetResponseWrapper response = tileService.getTile(zodiacId, lat, lng);

        // then
        assertThat(response).isNotNull();
        assertThat(response.tileGetResponseList()).hasSize(responseList.size());
        assertThat(response.tileGetResponseList()).containsExactlyElementsOf(responseList);

    }

    @Test
    @DisplayName("클러스터링 성공")
    public void getTileClusterSuccess() {
        // given
        double lat = 37.501161;
        double lng = 127.039668;
        int zoomLevel = 17;

        // 실제 서비스 메서드의 로직을 따라 geoHashString 계산
        String geoHashString = tileService.getGeoHashStringByZoomLevel(lat, lng, zoomLevel);

        List<TileClusterGetResponse> responseList = new ArrayList<>();

        responseList.add(TileClusterGetResponse.builder()
                .zodiacId(1L)
                .geoPoint(new GeoPoint(37.5, 127.0))
                .count(5L)
                .build());

        responseList.add(TileClusterGetResponse.builder()
                .zodiacId(2L)
                .geoPoint(new GeoPoint(37.6, 127.1))
                .count(3L)
                .build());

        when(tileRepository.getTileCluster(isNull(), eq(geoHashString))).thenReturn(responseList);

        // when
        TileClusterGetResponseWrapper response = tileService.getTileCluster(lat, lng, zoomLevel);

        // then
        assertThat(response).isNotNull();
        assertThat(response.tileClusterGetResponseList()).hasSize(2);
        assertThat(response.tileClusterGetResponseList()).containsExactlyElementsOf(responseList);
    }

    @Test
    @DisplayName("특정 간지 클러스터링 성공")
    public void getTileClusterSuccessWithZodiacId() {
        // given
        Long zodiacId = 3L;
        double lat = 37.501161;
        double lng = 127.039668;
        int zoomLevel = 17;

        // 실제 서비스 메서드의 로직을 따라 geoHashString 계산
        String geoHashString = tileService.getGeoHashStringByZoomLevel(lat, lng, zoomLevel);

        List<TileClusterGetResponse> responseList = new ArrayList<>();

        responseList.add(TileClusterGetResponse.builder()
                .zodiacId(zodiacId)
                .geoPoint(new GeoPoint(37.5, 127.0))
                .count(5L)
                .build());

        responseList.add(TileClusterGetResponse.builder()
                .zodiacId(zodiacId)
                .geoPoint(new GeoPoint(37.6, 127.1))
                .count(3L)
                .build());

        when(tileRepository.getTileCluster(eq(zodiacId), eq(geoHashString))).thenReturn(responseList);

        // when
        TileClusterGetResponseWrapper response = tileService.getTileCluster(zodiacId, lat, lng, zoomLevel);

        // then
        assertThat(response).isNotNull();
        assertThat(response.tileClusterGetResponseList()).hasSize(2);
        assertThat(response.tileClusterGetResponseList()).containsExactlyElementsOf(responseList);
    }

    @Test
    @DisplayName("존재하지 않는 간지로 인한 빈리스트")
    public void getTileClusterSuccessWithOutOfRangeZodiacId() {
        // given
        Long zodiacId = 15L;
        double lat = 37.501161;
        double lng = 127.039668;
        int zoomLevel = 17;

        // 실제 서비스 메서드의 로직을 따라 geoHashString 계산
        String geoHashString = tileService.getGeoHashStringByZoomLevel(lat, lng, zoomLevel);

        List<TileClusterGetResponse> responseList = new ArrayList<>();

        when(tileRepository.getTileCluster(eq(zodiacId), eq(geoHashString))).thenReturn(responseList);

        // when
        TileClusterGetResponseWrapper response = tileService.getTileCluster(zodiacId, lat, lng, zoomLevel);

        // then
        assertThat(response).isNotNull();
        assertThat(response.tileClusterGetResponseList()).hasSize(0);

    }

    @Test
    @DisplayName("팀 타일과 내 팀 타일 비교")
    public void getTileSituationSuccess() {
        //given
        Long no1ZodiacId = 1L;
        Long zodiacId = 3L;

        List<TileTeamSituationResponse> tileSituationList = new ArrayList<>();

        for ( int i = 1; i <= 12; ++i) {
            tileSituationList.add(TileTeamSituationResponse.builder()
                    .rank(i)
                    .zodiacId(Integer.toUnsignedLong(i))
                    .tileCount(Integer.toUnsignedLong(100 - i))
                    .build());
        }

        TileTeamSituationResponse no1Team = tileSituationList.stream().filter(
                t -> t.zodiacId().equals(no1ZodiacId)
        ).findFirst().orElse(null);

        TileTeamSituationResponse myTeam = tileSituationList.stream().filter(
                t -> t.zodiacId().equals(zodiacId)
        ).findFirst().orElse(null);

        TileSituationResponse expect = TileSituationResponse.builder()
                .No1Team(no1Team)
                .myTeam(myTeam)
                .rankGap(Objects.requireNonNull(no1Team).tileCount() - Objects.requireNonNull(myTeam).tileCount())
                .build();

        when(tileRepository.getTileSituation()).thenReturn(tileSituationList);

        //when
        TileSituationResponse result =  tileService.getTileSituation(zodiacId);

        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(expect);
        assertThat(result.rankGap()).isGreaterThanOrEqualTo(0);
    }

    @Test
    @DisplayName("1등 팀이랑 내 팀이랑 같을 때")
    public void getTileSituationSuccessWithSameTeam() {
        //given
        Long no1ZodiacId = 1L;
        Long zodiacId = 1L;

        List<TileTeamSituationResponse> tileSituationList = new ArrayList<>();

        for ( int i = 1; i <= 12; ++i) {
            tileSituationList.add(TileTeamSituationResponse.builder()
                    .rank(i)
                    .zodiacId(Integer.toUnsignedLong(i))
                    .tileCount(Integer.toUnsignedLong(100 - i))
                    .build());
        }

        TileTeamSituationResponse no1Team = tileSituationList.stream().filter(
                t -> t.zodiacId().equals(no1ZodiacId)
        ).findFirst().orElse(null);

        TileTeamSituationResponse myTeam = tileSituationList.stream().filter(
                t -> t.zodiacId().equals(zodiacId)
        ).findFirst().orElse(null);

        TileSituationResponse expect = TileSituationResponse.builder()
                .No1Team(no1Team)
                .myTeam(myTeam)
                .rankGap(Objects.requireNonNull(no1Team).tileCount() - Objects.requireNonNull(myTeam).tileCount())
                .build();

        when(tileRepository.getTileSituation()).thenReturn(tileSituationList);

        //when
        TileSituationResponse result =  tileService.getTileSituation(zodiacId);

        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(expect);
        assertThat(result.rankGap()).isGreaterThanOrEqualTo(0);
    }

    @Test
    @DisplayName("존재하지 않는 간지와 비교할 때")
    public void getTileSituationSuccessWithNotExistTeam() {
        //given
        Long no1ZodiacId = 1L;
        Long zodiacId = 15L;

        List<TileTeamSituationResponse> tileSituationList = new ArrayList<>();

        for ( int i = 1; i <= 12; ++i) {
            tileSituationList.add(TileTeamSituationResponse.builder()
                    .rank(i)
                    .zodiacId(Integer.toUnsignedLong(i))
                    .tileCount(Integer.toUnsignedLong(100 - i))
                    .build());
        }

        TileTeamSituationResponse no1Team = tileSituationList.stream().filter(
                t -> t.zodiacId().equals(no1ZodiacId)
        ).findFirst().orElse(null);

        TileSituationResponse expect = TileSituationResponse.builder()
                .No1Team(no1Team)
                .myTeam(null)
                .rankGap(null)
                .build();

        when(tileRepository.getTileSituation()).thenReturn(tileSituationList);

        //when
        TileSituationResponse result =  tileService.getTileSituation(zodiacId);

        //then
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(expect);
    }

    @Test
    @DisplayName("팀 랭킹을 가져오기")
    public void getRankingSuccess() {
        //given
        List<TileTeamSituationResponse> tileSituationList = new ArrayList<>();

        for ( int i = 1; i <= 12; ++i) {
            tileSituationList.add(TileTeamSituationResponse.builder()
                    .rank(i)
                    .zodiacId(Integer.toUnsignedLong(i))
                    .tileCount(Integer.toUnsignedLong(100 - i))
                    .build());
        }

        TileRankingResponse expect = TileRankingResponse.builder()
                .tileTeamSituationResponseList(tileSituationList)
                .build();

        when(tileRepository.getTileSituation()).thenReturn(tileSituationList);

        //when
        TileRankingResponse result = tileService.getTeamRanking();

        //then
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(expect);
    }

    @Test
    @DisplayName("팀 랭킹 미리보기 가져오기")
    public void getRankingPreViewSuccess() {
        //given
        Long zodiacId = 3L;
        int limit = 3;

        List<TileTeamSituationResponse> tileSituationList = new ArrayList<>();

        for ( int i = 1; i <= 12; ++i) {
            tileSituationList.add(TileTeamSituationResponse.builder()
                    .rank(i)
                    .zodiacId(Integer.toUnsignedLong(i))
                    .tileCount(Integer.toUnsignedLong(100 - i))
                    .build());
        }

        TileTeamSituationResponse myTeam = tileSituationList.stream().filter(
                t -> t.zodiacId().equals(zodiacId)
        ).findFirst().orElse(null);

        TilePreviewResponse expect = TilePreviewResponse.builder()
                .tileTeamSituationResponseList(tileSituationList.subList(0, limit))
                .myTeamRanking(Objects.requireNonNull(myTeam).rank())
                .build();

        when(tileRepository.getTileSituation()).thenReturn(tileSituationList);

        //when
        TilePreviewResponse result = tileService.getRankingPreview(zodiacId, limit);

        //then
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(expect);
    }

    @Test
    @DisplayName("존재하지 않은 간지로 인한 타일 미리보기 가져오기")
    public void getRankingPreViewSuccessWithNotExistTeam() {
        //given
        Long zodiacId = 15L;
        int limit = 3;

        List<TileTeamSituationResponse> tileSituationList = new ArrayList<>();

        for ( int i = 1; i <= 12; ++i) {
            tileSituationList.add(TileTeamSituationResponse.builder()
                    .rank(i)
                    .zodiacId(Integer.toUnsignedLong(i))
                    .tileCount(Integer.toUnsignedLong(100 - i))
                    .build());
        }

        TilePreviewResponse expect = TilePreviewResponse.builder()
                .tileTeamSituationResponseList(tileSituationList.subList(0, limit))
                .myTeamRanking(null)
                .build();

        when(tileRepository.getTileSituation()).thenReturn(tileSituationList);

        //when
        TilePreviewResponse result = tileService.getRankingPreview(zodiacId, limit);

        //then
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(expect);
    }
}
