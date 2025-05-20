package com.ssafy.yoittang.course.presentation;

import java.net.URI;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.course.application.CourseService;
import com.ssafy.yoittang.course.domain.dto.request.CourseCreateRequest;
import com.ssafy.yoittang.course.domain.dto.response.CourseClearMemberResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseDetailResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.course.domain.dto.response.RunCourseResponse;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.tile.domain.response.TileGetResponseWrapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @GetMapping("/histories/preview")
    public ResponseEntity<List<RunCourseResponse>> getRunCoursePreview(
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getRunCoursePreview(member));
    }

    @GetMapping("/histories")
    public ResponseEntity<PageInfo<RunCourseResponse>> getRunCourseAll(
            @RequestParam(required = false, name = "keyword") String keyword,
            @RequestParam(required = false, name = "pageToken") String pageToken,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getRunCourseAll(keyword, pageToken, member));
    }

    @PostMapping("/{courseId}/bookmarks")
    public ResponseEntity<Boolean> toggleBookmark(
            @PathVariable Long courseId,
            @AuthMember Member member
    ) {
        courseService.toggleCourseBookmark(courseId, member);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookmarks/preview")
    public ResponseEntity<List<CourseSummaryResponse>> getBookmarkCoursePreview(
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getBookmarkCoursePreview(member));
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<PageInfo<RunCourseResponse>> getBookmarkCourseAll(
            @RequestParam(required = false, name = "keyword") String keyword,
            @RequestParam(required = false, name = "pageToken") String pageToken,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getBookmarkCourseAll(pageToken, keyword, member));
    }

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> createCourse(
            @RequestPart("courseCreateRequest") CourseCreateRequest courseCreateRequest,
            @RequestPart("courseImage") MultipartFile courseImage,
            @AuthMember Member member
    ) {
        courseService.createCourse(courseCreateRequest, courseImage, member);
        return ResponseEntity.created(URI.create("/api/v1/course")).build();
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDetailResponse> getCourseDetail(
            @PathVariable("courseId") Long courseId,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getCourseDetail(courseId, member));
    }

    @GetMapping("/{courseId}/cleared-members/preview")
    public ResponseEntity<List<CourseClearMemberResponse>> getClearedMembersByCourseIdPreview(
            @PathVariable("courseId") Long courseId,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getClearedMembersByCourseIdPreview(
                courseId
        ));
    }

    @GetMapping("/{courseId}/cleared-members")
    public ResponseEntity<PageInfo<CourseClearMemberResponse>> getClearedMembersByCourseId(
            @PathVariable("courseId") Long courseId,
            @RequestParam(required = false, name = "pageToken") String pageToken,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getClearedMembersByCourseId(
                courseId,
                pageToken
        ));
    }

    @GetMapping("/recommends")
    public ResponseEntity<List<CourseSummaryResponse>> getRecommendCourse(
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getRecommendCourse(member));
    }

    @GetMapping
    public ResponseEntity<PageInfo<RunCourseResponse>> getCourseByKeyword(
            @RequestParam(required = false, name = "keyword") String keyword,
            @RequestParam(required = false, name = "pageToken") String pageToken,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getCourseByKeyword(keyword, pageToken, member));
    }

    @GetMapping("/preview")
    public ResponseEntity<List<CourseSummaryResponse>> getRandomCourses(
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getRandomCourses());
    }

    @GetMapping("/{courseId}/nearBy/tiles")
    public ResponseEntity<TileGetResponseWrapper> getTilesNearBy(
            @PathVariable("courseId") Long courseId,
            @RequestParam Double lat,
            @RequestParam Double lng,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getTilesNearBy(courseId, lat, lng));
    }
}
