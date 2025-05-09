package com.ssafy.yoittang.course.application;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.SdkClientException;
import com.ssafy.yoittang.common.aws.S3ImageUploader;
import com.ssafy.yoittang.course.domain.Course;
import com.ssafy.yoittang.course.domain.dto.request.CourseCreateRequest;
import com.ssafy.yoittang.course.domain.dto.response.CourseDetailResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.course.domain.repository.CourseRepository;
import com.ssafy.yoittang.course.domain.repository.LocationJpaRepository;
import com.ssafy.yoittang.member.domain.DisclosureStatus;
import com.ssafy.yoittang.member.domain.Gender;
import com.ssafy.yoittang.member.domain.Member;

@ExtendWith(MockitoExtension.class)
public class CourseServiceTest {

    @InjectMocks
    private CourseService courseService;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private LocationJpaRepository locationJpaRepository;

    @Mock
    private S3ImageUploader s3ImageUploader;

    private Member mockMember;

    @BeforeEach
    void setUp() {
        mockMember = Member.builder()
                .zordiacId(1L)
                .socialId("socialId123")
                .email("ssafy@ssafy.com")
                .birthDate(LocalDate.of(1995, 1, 1))
                .nickname("nickname")
                .profileImageUrl("hello")
                .gender(Gender.MALE)
                .weight(60.8F)
                .disclosure(DisclosureStatus.ALL)
                .stateMessage("basic")
                .build();
    }

    @Test
    void createCourseSuccess() {
        List<Double[]> samplePoints = List.of(
                new Double[]{37.5665, 126.9780}, // 서울시청
                new Double[]{37.5651, 126.9895}, // 을지로입구역
                new Double[]{37.5642, 126.9981}, // 종로3가
                new Double[]{37.5704, 126.9920}, // 종묘
                new Double[]{37.5720, 126.9769}  // 경복궁
        );
        CourseCreateRequest courseCreateRequest = new CourseCreateRequest(
                "코스1",
                1500.0F,
                samplePoints
        );
        MultipartFile mockImage = mock(MultipartFile.class);
        String imageUrl = "https://example.com";
        when(s3ImageUploader.uploadCourse(mockImage)).thenReturn(imageUrl);
        courseService.createCourse(courseCreateRequest, mockImage, mockMember);
        verify(s3ImageUploader, times(1)).uploadCourse(mockImage);
        verify(courseRepository, times(1)).save(any(Course.class));
        verify(locationJpaRepository, times(1))
                .bulkInsert(argThat(list -> list.size() == samplePoints.size()));
    }

    @Test
    void createCourseWhenS3UploadFails() {
        List<Double[]> samplePoints = List.of(
                new Double[]{37.5665, 126.9780}, // 서울시청
                new Double[]{37.5651, 126.9895}, // 을지로입구역
                new Double[]{37.5642, 126.9981}, // 종로3가
                new Double[]{37.5704, 126.9920}, // 종묘
                new Double[]{37.5720, 126.9769}  // 경복궁
        );

        CourseCreateRequest courseCreateRequest = new CourseCreateRequest(
                "실패 코스1",
                1500.0F,
                samplePoints
        );
        MultipartFile mockImage = mock(MultipartFile.class);
        when(s3ImageUploader.uploadCourse(mockImage))
                .thenThrow(new SdkClientException("코스 이미지 업로드 실패"));

        assertThrows(SdkClientException.class, () -> {
            courseService.createCourse(courseCreateRequest, mockImage, mockMember);
        });

        verify(courseRepository, never()).save(any());
        verify(locationJpaRepository, never()).bulkInsert(anyList());
    }

    @Test
    void createCourseWithEmptyPointsShouldNotSaveLocations() {
        CourseCreateRequest courseCreateRequest = new CourseCreateRequest(
                "실패 코스1",
                1500.0F,
                new ArrayList<>()
        );
        MultipartFile mockImage = mock(MultipartFile.class);
        String imageUrl = "https://example.com";
        when(s3ImageUploader.uploadCourse(mockImage)).thenReturn(imageUrl);
        courseService.createCourse(courseCreateRequest, mockImage, mockMember);
        verify(s3ImageUploader, times(1)).uploadCourse(mockImage);
        verify(courseRepository, times(1)).save(any(Course.class));
        verify(locationJpaRepository).bulkInsert(eq(Collections.emptyList()));

    }

    @Test
    void getCourseDetailSuccess() {
        Long courseId = 1L;
        CourseSummaryResponse courseSummaryResponse = new CourseSummaryResponse(
                1L, "성공 코스1", 150.0F, "https://example.com"
        );
        when(courseRepository.findCourseByCourseId(courseId)).thenReturn(courseSummaryResponse);
        mockMember.updateRunningStats(1800, 5000);

        CourseDetailResponse courseDetailResponse = courseService.getCourseDetail(courseId, mockMember);
        assertEquals(courseId, courseDetailResponse.courseId());
        assertEquals("성공 코스1", courseDetailResponse.courseName());
        assertEquals(150.0F, courseDetailResponse.distance());
        assertEquals("https://example.com", courseDetailResponse.courseImageUrl());
        assertTrue(courseDetailResponse.calories() > 0);
        assertTrue(courseDetailResponse.times() > 0);
    }

    @Test
    void getCourseDetailFailWhenCourseNotFound() {
        Long invalidCourseId = 99L;
        when(courseRepository.findCourseByCourseId(invalidCourseId)).thenReturn(null);

        assertThrows(NullPointerException.class, () -> {
            courseService.getCourseDetail(invalidCourseId, mockMember);
        });

        verify(courseRepository).findCourseByCourseId(invalidCourseId);
    }
}
