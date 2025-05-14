package com.ssafy.yoittang.course.application;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.yoittang.common.aws.S3ImageUploader;
import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.course.domain.BookmarkViewType;
import com.ssafy.yoittang.course.domain.Course;
import com.ssafy.yoittang.course.domain.CourseTile;
import com.ssafy.yoittang.course.domain.dto.request.CourseCreateRequest;
import com.ssafy.yoittang.course.domain.dto.response.CourseClearMemberResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseDetailResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.course.domain.repository.CourseRepository;
import com.ssafy.yoittang.course.domain.repository.CourseTileJpaRepository;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.running.domain.Running;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.runningpoint.domain.RunningPoint;
import com.ssafy.yoittang.runningpoint.domain.RunningPointRepository;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;

import ch.hsr.geohash.GeoHash;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseTileJpaRepository courseTileJpaRepository;
    private final RunningRepository runningRepository;
    private final RunningPointRepository runningPointRepository;
    private final S3ImageUploader s3ImageUploader;

    private static final double DISTANCE_THRESHOLD_KM = 10.0;

    public List<CourseSummaryResponse> getBookmarkCourse(BookmarkViewType type, Member member) {
        if (type.equals(BookmarkViewType.ALL)) {
            return courseRepository.findBookmarkedCoursesByMemberId(member.getMemberId(), null);
        } else {
            return courseRepository.findBookmarkedCoursesByMemberId(member.getMemberId(), 4);
        }
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
        LinkedHashSet<CourseTile> courseTiles = new LinkedHashSet<>();
        for (GeoPoint geoPoint : courseCreateRequest.geoPoints()) {
            double lat = geoPoint.lat();
            double lng = geoPoint.lng();
            String geoHash = GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 7);
            courseTiles.add(
                    CourseTile.builder()
                            .courseId(course.getCourseId())
                            .geoHash(geoHash)
                            .build()
            );
        }
        courseTileJpaRepository.bulkInsert(new ArrayList<>(courseTiles));
    }

    public CourseDetailResponse getCourseDetail(Long courseId, Member member) {
        CourseSummaryResponse summaryResponse = courseRepository.findCourseByCourseId(courseId);
        int runningTimes = member.getRunningTimes();;
        int runningDistances = member.getRunningDistances();
        double paceMinPerKm = runningDistances > 0
                ? (runningTimes / 60.0) / (runningDistances / 1000.0) // 분/km
                : 10.0; // 기본값: 10분/km

        int times = (int) Math.round(summaryResponse.distance() * paceMinPerKm); //분/km

        double met = estimateMetFromPace(paceMinPerKm);
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

    public List<CourseSummaryResponse> getRecommendCourse(Member member) {
        List<Running> recentRunning = runningRepository.findRecentCompleteRunning(member.getMemberId(), 20);
        if (recentRunning.isEmpty()) {
            return List.of();
        }
        List<RunningPoint> endPoints = runningPointRepository.findLastPointsByRunningIds(
                recentRunning.stream().map(Running::getRunningId).toList()
        );

        List<RunningPoint> filtered = filterOutliers(endPoints);
        if (filtered.isEmpty()) {
            return List.of();
        }

        double avgLat = filtered.stream().mapToDouble(p -> p.getRoute().getEndPoint().getY()).average().orElseThrow();
        double avgLon = filtered.stream().mapToDouble(p -> p.getRoute().getEndPoint().getX()).average().orElseThrow();

        List<Long> courseIds = filtered.stream()
                .map(RunningPoint::getCourseId)
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        float totalDistance = courseRepository.sumDistancesByCourseIds(courseIds);

        double avgDistance = totalDistance / (double) filtered.size();
        double minDistance = avgDistance * 0.7;
        double maxDistance = avgDistance * 1.3;

        List<CourseSummaryResponse> nearbyCourses = courseRepository.findNearbyCoursesWithinDistance(
                avgLat, avgLon, 5.0, minDistance, maxDistance
        );

        // 7. 무작위 10개 샘플링
        Collections.shuffle(nearbyCourses);
        return nearbyCourses.stream().limit(10).toList();
    }

    public PageInfo<CourseSummaryResponse> getCourseByKeyword(String keyword, String pageToken) {
        return courseRepository.findCourseByKeyword(keyword, pageToken);
    }

    private double estimateMetFromPace(double paceMinPerKm) {
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

    private List<RunningPoint> filterOutliers(List<RunningPoint> points) {
        if (points.size() <= 1) {
            return points;
        }

        double[] weightedAvg = weightedAverageLocation(points);

        double avgLat = weightedAvg[0];
        double avgLng = weightedAvg[1];

        return points.stream()
                .filter(p -> {
                    double lat = p.getRoute().getEndPoint().getY();
                    double lng = p.getRoute().getEndPoint().getX();
                    return haversine(lat, lng, avgLat, avgLng) <= DISTANCE_THRESHOLD_KM;
                })
                .toList();
    }

    private double haversine(double lat1, double lng1, double lat2, double lng2) {
        final int R = 6371; // Radius of the Earth in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lngDistance = Math.toRadians(lng2 - lng1);
        double haversineFormula  = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
        double centralAngle  = 2 * Math.atan2(Math.sqrt(haversineFormula), Math.sqrt(1 - haversineFormula));
        return R * centralAngle;
    }

    private double[] weightedAverageLocation(List<RunningPoint> points) {
        double sumWeight = 0.0;
        double weightedLat = 0.0;
        double weightedLng = 0.0;

        double midLat = points.stream().mapToDouble(p -> p.getRoute().getEndPoint().getY()).average().orElse(0);
        double midLng = points.stream().mapToDouble(p -> p.getRoute().getEndPoint().getX()).average().orElse(0);

        for (RunningPoint point : points) {
            double lat = point.getRoute().getEndPoint().getY();
            double lng = point.getRoute().getEndPoint().getX();
            double distance = haversine(lat, lng, midLat, midLng);
            double weight = 1 / (1 + distance);

            weightedLat += lat * weight;
            weightedLng += lng * weight;
            sumWeight += weight;
        }

        return new double[] {weightedLat / sumWeight, weightedLng / sumWeight};
    }
}
