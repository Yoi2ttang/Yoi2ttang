package com.ssafy.yoittang.running.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
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

import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.NotFoundException;
import com.ssafy.yoittang.course.domain.Course;
import com.ssafy.yoittang.course.domain.repository.CourseJpaRepositoy;
import com.ssafy.yoittang.member.domain.DisclosureStatus;
import com.ssafy.yoittang.member.domain.Gender;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.running.domain.Running;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.running.domain.State;
import com.ssafy.yoittang.running.domain.dto.request.ChallengeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.request.FreeRunningCreateRequest;
import com.ssafy.yoittang.running.domain.dto.request.RunningEndPatchRequest;
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

    @Mock
    private CourseJpaRepositoy courseJpaRepositoy;

    private Member mockMember;

    @BeforeEach
    void setUp() {
        mockMember = Member.builder()
                .zodiacId(515L)
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
                .route(runningService.getLineStringByOnePoint(lat, lng)) // 실제 메서드라면 static으로 따로 빼야 함
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

    //성공하는 케이스
    @Test
    public void createChallengeRunningSuccessTest() {
        // Given
        Double lat = 37.501161;
        Double lng = 127.039668;
        Long courseID = 2L;
        LocalDateTime now = LocalDateTime.now();

        Course course = Course.builder()
                .courseName("2번 코스")
                .courseImageUrl("https://dlfkeowlsl")
                .distance(29.2393F)
                .build();
        ReflectionTestUtils.setField(course, "courseId", courseID);

        ChallengeRunningCreateRequest request = ChallengeRunningCreateRequest.builder()
                .courseId(courseID)
                .lat(lat)
                .lng(lng)
                .currentTime(now)
                .build();

        Running savedRunning = Running.builder()
                .memberId(mockMember.getMemberId())
                .startTime(now)
                .state(State.RUNNING)
                .build();
        ReflectionTestUtils.setField(savedRunning, "runningId", 3L); // 가짜 ID 부여

        RunningPoint savedPoint = RunningPoint.builder()
                .runningId(3L)
                .sequence(0)
                .arrivalTime(now)
                .route(runningService.getLineStringByOnePoint(lat, lng)) // 실제 메서드라면 static으로 따로 빼야 함
                .build();
        ReflectionTestUtils.setField(savedPoint, "runningPointId", 11L); // 가짜 ID

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
        when(courseJpaRepositoy.existsById(courseID)).thenReturn(true);
        when(runningRepository.save(any(Running.class))).thenReturn(savedRunning);
        when(runningPointRepository.save(any(RunningPoint.class))).thenReturn(savedPoint);
        when(tileRepository.findByGeoHash(geoHashString)).thenReturn(Optional.of(tile));

        // When
        RunningCreateResponse response = runningService.createChallengeRunning(request, mockMember);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.geoHash()).isEqualTo(geoHashString);
        assertThat(response.sw().lat()).isEqualTo(tile.getLatSouth());
        assertThat(response.sw().lng()).isEqualTo(tile.getLngWest());
        assertThat(response.ne().lat()).isEqualTo(tile.getLatNorth());
        assertThat(response.ne().lng()).isEqualTo(tile.getLngEast());

        verify(courseJpaRepositoy).existsById(courseID);
        verify(runningRepository).save(any(Running.class));
        verify(runningPointRepository).save(any(RunningPoint.class));
        verify(tileRepository).findByGeoHash(geoHashString);
    }

    //코스가 존재하지 않아서 실패하는 케이스
    @Test
    public void createChallengeRunningFailByNotExistCourseTest() {
        // Given
        Double lat = 37.501161;
        Double lng = 127.039668;
        Long courseID = 2L;
        LocalDateTime now = LocalDateTime.now();

        ChallengeRunningCreateRequest request = ChallengeRunningCreateRequest.builder()
                .courseId(courseID)
                .lat(lat)
                .lng(lng)
                .currentTime(now)
                .build();

        when(courseJpaRepositoy.existsById(courseID)).thenReturn(false);

        // When & Then
        NotFoundException exception = assertThrows(
                NotFoundException.class,
                () -> runningService.createChallengeRunning(request, mockMember)
        );

        assertThat(exception.getMessage()).contains("존재하지 않는 코스입니다."); // 예외 메시지 확인 (선택)

        verify(courseJpaRepositoy).existsById(courseID);
        // 아래는 실행되지 않았어야 하므로 생략 또는 never()로 명시 가능
        verify(runningRepository, never()).save(any());
        verify(runningPointRepository, never()).save(any());
        verify(tileRepository, never()).findByGeoHash(any());
    }

    //런닝 종료
    @Test
    public void endRunningSuccess() {
        // Given
        Long runningId = 3L;
        Long courseId = 2L;
        LocalDateTime createdAt = LocalDateTime.of(2025, 5, 8, 14, 30);
        LocalDateTime endTime = createdAt.plusMinutes(15);

        Running savedRunning = Running.builder()
                .runningId(runningId)
                .startTime(createdAt)
                .courseId(courseId)
                .state(State.RUNNING)
                .build();

        // 핵심 mock 추가
        when(runningRepository.findByRunningIdAndMemberId(runningId, mockMember.getMemberId()))
                .thenReturn(Optional.of(savedRunning));

        RunningEndPatchRequest runningEndPatchRequest = RunningEndPatchRequest.builder()
                .endTime(endTime)
                .build();

        // When
        runningService.endRunning(runningId, runningEndPatchRequest, mockMember);

        // Then
        assertThat(savedRunning.getRunningId()).isEqualTo(runningId);
        assertThat(savedRunning.getCourseId()).isEqualTo(courseId);
        assertThat(savedRunning.getStartTime()).isEqualTo(createdAt);
        assertThat(savedRunning.getEndTime()).isEqualTo(endTime);
        assertThat(savedRunning.getState()).isEqualTo(State.COMPLETE);
    }

    //런닝이 존재 하지 않아 종료 실패
    @Test
    public void endRunningFailWithNotFoundRunning() {
        // Given
        Long runningId = 3L;
        Long courseId = 2L;
        LocalDateTime createdAt = LocalDateTime.of(2025, 5, 8, 14, 30);
        LocalDateTime endTime = createdAt.plusMinutes(15);

        when(runningRepository.findByRunningIdAndMemberId(runningId, mockMember.getMemberId()))
                .thenReturn(Optional.empty());

        RunningEndPatchRequest runningEndPatchRequest = RunningEndPatchRequest.builder()
                .endTime(endTime)
                .build();

        // When & Then
        NotFoundException exception = assertThrows(
                NotFoundException.class,
                () -> runningService.endRunning(runningId, runningEndPatchRequest, mockMember)
        );

        assertThat(exception.getMessage()).contains("런닝");
        verify(runningRepository, never()).save(any());
    }

    //런닝 종료시간이 시작시간 보다 빨라서 종료 실패
    @Test
    public void endRunningFailWithEndTimeBeforeStartTime() {
        // Given
        Long runningId = 3L;
        Long courseId = 2L;
        LocalDateTime createdAt = LocalDateTime.of(2025, 5, 8, 14, 30);
        LocalDateTime endTime = createdAt.minusMinutes(15);

        Running savedRunning = Running.builder()
                .runningId(runningId)
                .startTime(createdAt)
                .courseId(courseId)
                .state(State.RUNNING)
                .build();

        when(runningRepository.findByRunningIdAndMemberId(runningId, mockMember.getMemberId()))
                .thenReturn(Optional.of(savedRunning));

        RunningEndPatchRequest runningEndPatchRequest = RunningEndPatchRequest.builder()
                .endTime(endTime)
                .build();

        // When & Then
        BadRequestException exception = assertThrows(
                BadRequestException.class,
                () -> runningService.endRunning(runningId, runningEndPatchRequest, mockMember)
        );

        assertThat(exception.getMessage()).contains("종료");
        verify(runningRepository, never()).save(any());
    }
}
