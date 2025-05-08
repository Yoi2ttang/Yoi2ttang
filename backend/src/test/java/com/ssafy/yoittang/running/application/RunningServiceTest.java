package com.ssafy.yoittang.running.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.util.ReflectionTestUtils;

import com.ssafy.yoittang.member.domain.DisclosureStatus;
import com.ssafy.yoittang.member.domain.Gender;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.running.domain.Running;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.running.domain.State;
import com.ssafy.yoittang.running.domain.dto.request.FreeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.response.RunningCreateResponse;
import com.ssafy.yoittang.runningpoint.domain.RunningPoint;
import com.ssafy.yoittang.runningpoint.domain.RunningPointRepository;
import com.ssafy.yoittang.tile.domain.Tile;
import com.ssafy.yoittang.tile.domain.TileRepository;
import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;

import ch.hsr.geohash.BoundingBox;
import ch.hsr.geohash.GeoHash;

@ExtendWith(MockitoExtension.class)
public class RunningServiceTest {

    private static final Logger log = LoggerFactory.getLogger(RunningServiceTest.class);
    @InjectMocks
    private RunningService runningService;

    @Mock
    private RunningRepository runningRepository;

    @Mock
    private RunningPointRepository runningPointRepository;

    @Mock
    private TileHistoryRepository tileHistoryRepository;

    @Mock
    private TileRepository tileRepository;

    private Member mockMember;

    @BeforeEach
    void setUp() {
        mockMember = Member.builder()
                .zordiacId(515L)
                .socialId("socialId123")
                .birthDate(LocalDate.of(1999, 4, 9))
                .nickname("dlskwao0409")
                .profileImageUrl("hello")
                .gender(Gender.MALE)
                .weight(80.9F)
                .disclosure(DisclosureStatus.ALL)
                .stateMessage("basic")
                .build();
        ReflectionTestUtils.setField(mockMember, "memberId", 515L); // DB에 있던 1, 2 다음 3번이라고 가정

    }

    //성공하는 케이스
    @Test
    public void createFreeRunningSuccessTest() {
        // Given
        Double lat = 37.501161;
        Double lng = 127.039668;
        LocalDateTime now = LocalDateTime.now();

        FreeRunningCreateRequest request = FreeRunningCreateRequest.builder()
                .lat(lat)
                .lng(lng)
                .currentTime(now)
                .build();

        Running savedRunning = Running.builder()
                .memberId(mockMember.getMemberId())
                .startTime(now)
                .state(State.RUNNING)
                .build();
        ReflectionTestUtils.setField(savedRunning, "runningId", 2L); // 가짜 ID 부여

        RunningPoint savedPoint = RunningPoint.builder()
                .runningId(2L)
                .sequence(0)
                .arrivalTime(now)
                .root(runningService.getLineStringByOnePoint(lat, lng)) // 실제 메서드라면 static으로 따로 빼야 함
                .build();
        ReflectionTestUtils.setField(savedPoint, "runningPointId", 10L); // 가짜 ID

        String geoHashString = GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 7);

        BoundingBox boundingBox = GeoHash.fromGeohashString(geoHashString).getBoundingBox();

        Tile tile = Tile.builder()
                .geoHash(geoHashString)
                .latNorth(boundingBox.getNorthLatitude())
                .latSouth(boundingBox.getSouthLatitude())
                .lngEast(boundingBox.getEastLongitude())
                .lngWest(boundingBox.getWestLongitude())
                .build();

        // Stub repository behaviors
        when(runningRepository.save(any(Running.class))).thenReturn(savedRunning);
        when(runningPointRepository.save(any(RunningPoint.class))).thenReturn(savedPoint);
        when(tileRepository.findByGeoHash(geoHashString)).thenReturn(Optional.of(tile));

        // When
        RunningCreateResponse response = runningService.createFreeRunning(request, mockMember);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.geoHash()).isEqualTo(geoHashString);
        assertThat(response.sw().lat()).isEqualTo(tile.getLatSouth());
        assertThat(response.sw().lng()).isEqualTo(tile.getLngWest());
        assertThat(response.ne().lat()).isEqualTo(tile.getLatNorth());
        assertThat(response.ne().lng()).isEqualTo(tile.getLngEast());

        verify(runningRepository).save(any(Running.class));
        verify(runningPointRepository).save(any(RunningPoint.class));
        verify(tileRepository).findByGeoHash(geoHashString);
    }
}
