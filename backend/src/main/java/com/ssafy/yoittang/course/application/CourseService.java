package com.ssafy.yoittang.course.application;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.yoittang.common.aws.S3ImageUploader;
import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.course.domain.Course;
import com.ssafy.yoittang.course.domain.CourseBookmark;
import com.ssafy.yoittang.course.domain.CourseTile;
import com.ssafy.yoittang.course.domain.dto.request.CourseCreateRequest;
import com.ssafy.yoittang.course.domain.dto.response.CourseClearMemberResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseDetailResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.course.domain.dto.response.RunCourseResponse;
import com.ssafy.yoittang.course.domain.repository.CourseBookmarkJpaRepository;
import com.ssafy.yoittang.course.domain.repository.CourseRepository;
import com.ssafy.yoittang.course.domain.repository.CourseTileJpaRepository;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.TileRepository;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;
import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;

import ch.hsr.geohash.GeoHash;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final MemberRepository memberRepository;
    private final CourseRepository courseRepository;
    private final CourseBookmarkJpaRepository courseBookmarkJpaRepository;
    private final CourseTileJpaRepository courseTileJpaRepository;
    private final RunningRepository runningRepository;
    private final TileRepository tileRepository;
    private final TileHistoryRepository tileHistoryRepository;
    private final S3ImageUploader s3ImageUploader;

    private static final int DEFAULT_PAGE_SIZE = 10;

    public List<RunCourseResponse> getRunCoursePreview(Member member) {
        List<Course> courses = courseRepository.findCompletedCoursesByMemberId(member.getMemberId(), 3);
        return toRunCourseResponsesFromCourses(courses, member.getMemberId());
    }

    public PageInfo<RunCourseResponse> getRunCourseAll(String keyword, String pageToken, Member member) {
        PageInfo<Course> courses = courseRepository.findPagedCompletedCoursesByMemberId(
                member.getMemberId(),
                keyword + "%",
                pageToken
        );
        List<Course> courseList = courses.data();
        List<RunCourseResponse> responses = toRunCourseResponsesFromCourses(courseList, member.getMemberId());
        return PageInfo.of(responses, DEFAULT_PAGE_SIZE, RunCourseResponse::courseId);
    }

    public List<CourseSummaryResponse> getBookmarkCoursePreview(Member member) {
        return courseRepository.findBookmarkedCoursesByMemberId(member.getMemberId(), 4);
    }

    public PageInfo<RunCourseResponse> getBookmarkCourseAll(String pageToken, String keyword, Member member) {
        PageInfo<CourseSummaryResponse> courses = courseRepository.findPageBookmarkedCoursesByMemberId(
                member.getMemberId(),
                keyword + "%",
                pageToken
        );
        List<CourseSummaryResponse> courseList = courses.data();
        List<RunCourseResponse> responses = toRunCourseResponsesFromCourseSummary(courseList, member.getMemberId());
        return PageInfo.of(responses, DEFAULT_PAGE_SIZE, RunCourseResponse::courseId);
    }

    public List<CourseSummaryResponse> getRandomCourses() {
        return courseRepository.findRandomCourses(10);
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

    @Transactional
    public void toggleCourseBookmark(Long courseId, Member member) {
        Optional<CourseBookmark> courseBookmarkOptional = courseBookmarkJpaRepository.findBookmarkByMemberIdAndCourseId(
                member.getMemberId(),
                courseId
        );
        if (courseBookmarkOptional.isPresent()) {
            CourseBookmark courseBookmark = courseBookmarkOptional.get();
            courseBookmark.changeState();
        }
        courseBookmarkJpaRepository.save(
                CourseBookmark.builder()
                        .memberId(member.getMemberId())
                        .courseId(courseId)
                        .build()
        );
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
                courseBookmarkJpaRepository.existsByMemberIdAndCourseIdAndIsActiveTrue(
                        member.getMemberId(),
                        courseId
                ),
                summaryResponse.courseImageUrl(),
                calories,
                times
        );
    }

    public Integer getClearedMemberCount(Long courseId) {
        List<Long> memberIds = runningRepository.findMemberIdsByCourseId(courseId);
        return getClearedMembersCount(courseId, memberIds);
    }

    public List<CourseClearMemberResponse> getClearedMembersByCourseIdPreview(Long courseId, Member member) {
        List<Long> memberIds = runningRepository.findMemberIdsByCourseId(courseId);
        return getClearedMembers(courseId, memberIds, member.getMemberId());
    }

    public PageInfo<CourseClearMemberResponse> getClearedMembersByCourseId(
            Long courseId,
            String pageToken,
            Member member
    ) {
        List<Long> pagedMemberIds = runningRepository.findPagedClearedMemberIdsByCourseId(
                courseId,
                pageToken,
                DEFAULT_PAGE_SIZE
        );
        List<CourseClearMemberResponse> responses = getClearedMembers(courseId, pagedMemberIds, member.getMemberId());
        return PageInfo.of(responses, DEFAULT_PAGE_SIZE, CourseClearMemberResponse::memberId);
    }

    public PageInfo<RunCourseResponse> getCourseByKeyword(String keyword, String pageToken, Member member) {
        PageInfo<CourseSummaryResponse> courseSummaryResponsePageInfo = courseRepository.findCourseByKeyword(
                keyword,
                pageToken
        );
        List<CourseSummaryResponse> courseList = courseSummaryResponsePageInfo.data();
        List<RunCourseResponse> responses = toRunCourseResponsesFromCourseSummary(courseList, member.getMemberId());
        return PageInfo.of(responses, DEFAULT_PAGE_SIZE, RunCourseResponse::courseId);
    }

    public TileGetResponseWrapper getTilesNearBy(Long courseId, Double lat, Double lng) {
        String geoHashString =
                GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 6) + "%";

//        return TileGetResponseWrapper.builder()
//                .tileGetResponseList(tileRepository.getTileByCourseId(courseId, geoHashString))
//                .build(); //경과 시간: 0.588초

        List<String> geoHashList = getGeoHashes(courseId, geoHashString);

        return TileGetResponseWrapper.builder()
                .tileGetResponseList(tileRepository.getTilesInGeoHashes(geoHashList))
                .build(); //0.289c초
    }

    private List<String> getGeoHashes(Long courseId, String geoHashString) {
        return courseTileJpaRepository.findGeoHashesByCourseIdAndGeoHashPrefix(courseId, geoHashString);
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

    private List<RunCourseResponse> toRunCourseResponsesFromCourses(List<Course> courses, Long memberId) {
        List<Long> courseIds = courses.stream().map(Course::getCourseId).toList();

        Map<Long, Long> totalTiles = courseTileJpaRepository.countCourseTileByCourseIds(courseIds);
        Map<Long, Long> visitedTiles = tileHistoryRepository.countVisitedCourseTilesByMember(memberId, courseIds);

        return courses.stream()
                .map(course -> {
                    Long total = totalTiles.getOrDefault(course.getCourseId(), 0L);
                    Long visited = visitedTiles.getOrDefault(course.getCourseId(), 0L);
                    int completionRate = (total > 0) ? (int)((visited * 100.0) / total) : 0;

                    return new RunCourseResponse(
                            course.getCourseId(),
                            course.getCourseName(),
                            course.getDistance(),
                            course.getCourseImageUrl(),
                            completionRate
                    );
                })
                .toList();
    }

    private List<RunCourseResponse> toRunCourseResponsesFromCourseSummary(
            List<CourseSummaryResponse> courses,
            Long memberId
    ) {
        List<Long> courseIds = courses.stream().map(CourseSummaryResponse::courseId).toList();

        Map<Long, Long> totalTiles = courseTileJpaRepository.countCourseTileByCourseIds(courseIds);
        Map<Long, Long> visitedTiles = tileHistoryRepository.countVisitedCourseTilesByMember(memberId, courseIds);

        return courses.stream()
                .map(course -> {
                    Long total = totalTiles.getOrDefault(course.courseId(), 0L);
                    Long visited = visitedTiles.getOrDefault(course.courseId(), 0L);
                    int completionRate = (total > 0) ? (int)((visited * 100.0) / total) : 0;

                    return new RunCourseResponse(
                            course.courseId(),
                            course.courseName(),
                            course.distance(),
                            course.courseImageUrl(),
                            completionRate
                    );
                })
                .toList();
    }

    private List<CourseClearMemberResponse> getClearedMembers(
            Long courseId,
            List<Long> candidateMemberIds,
            Long currentMemberId
    ) {
        Long totalTiles = courseTileJpaRepository.countCourseTileByCourseId(courseId);

        Map<Long, Long> visitedTileByMember = tileHistoryRepository.countVisitedTilesByCourseAndMember(
                courseId,
                candidateMemberIds
        );

        List<Long> clearedMemberIds = visitedTileByMember.entrySet().stream()
                .filter(entry -> Objects.equals(entry.getValue(), totalTiles))
                .map(Map.Entry::getKey)
                .toList();

        return memberRepository.findCourseClearMembersByIds(clearedMemberIds, currentMemberId);
    }

    private Integer getClearedMembersCount(
            Long courseId,
            List<Long> candidateMemberIds
    ) {
        Long totalTiles = courseTileJpaRepository.countCourseTileByCourseId(courseId);

        Map<Long, Long> visitedTileByMember = tileHistoryRepository.countVisitedTilesByCourseAndMember(
                courseId,
                candidateMemberIds
        );

        List<Long> clearedMemberIds = visitedTileByMember.entrySet().stream()
                .filter(entry -> Objects.equals(entry.getValue(), totalTiles))
                .map(Map.Entry::getKey)
                .toList();

        return clearedMemberIds.size();
    }

}
