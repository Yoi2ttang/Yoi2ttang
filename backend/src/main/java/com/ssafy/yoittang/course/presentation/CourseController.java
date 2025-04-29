package com.ssafy.yoittang.course.presentation;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.course.application.CourseService;
import com.ssafy.yoittang.course.domain.dto.request.CourseCreateRequest;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.member.domain.Member;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @GetMapping("/bookmark")
    public ResponseEntity<List<CourseSummaryResponse>> getBookmarkCourse(
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(courseService.getBookmarkCourse(member));
    }

    @PostMapping
    public ResponseEntity<Void> createCourse(
            @RequestPart("courseCreateRequest") CourseCreateRequest courseCreateRequest,
            @RequestPart("courseImage") MultipartFile courseImage,
            @AuthMember Member member
    ) {
        courseService.createCourse(courseCreateRequest, courseImage, member);
        return ResponseEntity.created(URI.create("/api/v1/course")).build();
    }
}
