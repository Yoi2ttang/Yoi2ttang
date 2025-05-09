package com.ssafy.yoittang.course.application;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.yoittang.common.aws.S3ImageUploader;
import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.course.domain.Course;
import com.ssafy.yoittang.course.domain.Location;
import com.ssafy.yoittang.course.domain.dto.request.CourseCreateRequest;
import com.ssafy.yoittang.course.domain.dto.response.CourseClearMemberResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseDetailResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.course.domain.repository.CourseRepository;
import com.ssafy.yoittang.course.domain.repository.LocationJpaRepository;
import com.ssafy.yoittang.member.domain.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final LocationJpaRepository locationJpaRepository;
    private final S3ImageUploader s3ImageUploader;

    public List<CourseSummaryResponse> getBookmarkCourse(Member member) {
        return courseRepository.findBookmarkedCoursesByMemberId(member.getMemberId());
    }

    //추후 로직 수정 예정
    @Transactional
    public void createCourse(
            CourseCreateRequest courseCreateRequest,
            MultipartFile courseImage,
            Member member
    ) {
        String imageUrl = s3ImageUploader.uploadCourse(courseImage);
        Course course = Course.builder()
                .memberId(member.getMemberId())
                .courseName(courseCreateRequest.courseName())
                .distance(courseCreateRequest.distance())
                .courseImageUrl(imageUrl)
                .build();
        courseRepository.save(course);
        List<Location> locations = new ArrayList<>();
        for (Double[] point : courseCreateRequest.points()) {
            locations.add(
                    Location.builder()
                            .courseId(course.getCourseId())
                            .latitude(point[0])
                            .longitude(point[1])
                            .build()
            );
        }
        locationJpaRepository.bulkInsert(locations);
    }

    public CourseDetailResponse getCourseDetail(Long courseId, Member member) {
        CourseSummaryResponse summaryResponse = courseRepository.findCourseByCourseId(courseId);
        int runningTimes = member.getRunningTimes();;
        int runningDistances = member.getRunningDistances();
        double paceMinPerKm = (runningDistances > 0)
                ? (runningTimes / 60.0) / (runningDistances / 1000.0) // 분/km
                : 10.0; // 기본값: 10분/km

        int times = (int) Math.round(summaryResponse.distance() * paceMinPerKm); //분/km

        double met = estimateMetsFromPace(paceMinPerKm);
        int calories = (int)(times * met * 3.5 * member.getWeight() / 200);

        return new CourseDetailResponse(
                summaryResponse.courseId(),
                summaryResponse.courseName(),
                summaryResponse.distance(),
                summaryResponse.courseImageUrl(),
                calories,
                times
        );
    }

    public PageInfo<CourseClearMemberResponse> getClearedMembersByCourseId(Long courseId, String pageToken) {
        return courseRepository.findClearedMembersByCourseId(courseId, pageToken);
    }

    private double estimateMetsFromPace(double paceMinPerKm) {
        if (paceMinPerKm <= 4.5) {
            return 12.8; // 매우 빠른 달리기 (13~14.5 km/h)
        } else if (paceMinPerKm <= 5.5) {
            return 11.5; // 빠른 달리기 (12~13 km/h)
        } else if (paceMinPerKm <= 6.5) {
            return 10.0; // 중간 속도 (10~11.5 km/h)
        } else {
            return 8.3; // 가벼운 조깅 (8~9 km/h)
        }
    }
}
