package com.ssafy.yoittang.member.presentation;

import java.net.URI;
import java.util.List;


import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.course.domain.dto.response.CompleteCourseResponse;
import com.ssafy.yoittang.member.application.MemberService;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.dto.request.MemberUpdateRequest;
import com.ssafy.yoittang.member.domain.dto.response.FollowResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberProfileResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberTempResponse;
import com.ssafy.yoittang.member.domain.dto.response.MyProfileEditResponse;
import com.ssafy.yoittang.member.domain.dto.response.MyProfileResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/autocomplete")
    public ResponseEntity<PageInfo<MemberAutocompleteResponse>> getMemberAutocompleteList(
            @RequestParam("keyword") String keyword,
            @RequestParam(required = false, name = "pageToken") String pageToken
    ) {
        return ResponseEntity.ok(memberService.getMemberAutocompleteList(keyword, pageToken));
    }

    @GetMapping("/search")
    public ResponseEntity<PageInfo<MemberSearchResponse>> getMemberSearchList(
            @RequestParam("keyword") String keyword,
            @RequestParam(required = false, name = "pageToken") String pageToken,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberService.getMemberSearchList(keyword, pageToken, member));
    }

    @PostMapping("/{targetId}/follow")
    public ResponseEntity<Void> createFollow(
            @PathVariable("targetId") Long targetId,
            @AuthMember Member member
    ) {
        memberService.createFollow(targetId, member);
        return ResponseEntity.created(URI.create("/api/v1/member/" + targetId + "/follow")).build();
    }

    @PatchMapping("/{targetId}/unfollow")
    public ResponseEntity<Void> deleteFollow(
            @PathVariable("targetId") Long targetId,
            @AuthMember Member member
    ) {
        memberService.unfollow(targetId, member);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{targetId}/followings")
    public ResponseEntity<PageInfo<FollowResponse>> getFollowingList(
            @PathVariable("targetId") Long targetId,
            @RequestParam(required = false, name = "pageToken") String pageToken,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberService.getFollowingList(targetId, pageToken, member));
    }

    @GetMapping("/{targetId}/followers")
    public ResponseEntity<PageInfo<FollowResponse>> getFollowerList(
            @PathVariable("targetId") Long targetId,
            @RequestParam(required = false, name = "pageToken") String pageToken,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberService.getFollowerList(targetId, pageToken, member));
    }

    @GetMapping("/{targetId}/profiles")
    public ResponseEntity<MemberProfileResponse> getMemberProfile(
            @PathVariable("targetId") Long targetId,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberService.getMemberProfile(targetId, member));
    }

    @GetMapping("/me")
    public ResponseEntity<MyProfileResponse> getMyProfile(@AuthMember Member member) {
        return ResponseEntity.ok(memberService.getMyProfile(member));
    }

    @PatchMapping(
            value = "/profiles",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> updateProfile(
            @RequestPart MemberUpdateRequest memberUpdateRequest,
            @RequestPart(required = false, value = "image") MultipartFile file,
            @AuthMember Member member
    ) {
        memberService.updateProfile(memberUpdateRequest, file, member);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/profiles/edit")
    public ResponseEntity<MyProfileEditResponse> getProfileEdit(@AuthMember Member member) {
        return ResponseEntity.ok(memberService.getProfileEdit(member));
    }

    @GetMapping("/{targetId}/completed-courses")
    public ResponseEntity<List<CompleteCourseResponse>> getCompleteCourse(
            @PathVariable("targetId") Long targetId,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberService.getCompleteCourse(targetId, member));
    }

    //이 코드는 refactoring 되면 사라질 예정입니다.
    @Operation(summary = "멤버정보 보기..", description = "이 코드는 refactoring 되면 사라질 예정입니다.")
    @ApiResponses(value = {
        @ApiResponse(
                    responseCode = "200",
                    description = "성공하면 팀 랭킹 일부와 내 팀 랭킹을 가져옵니다.",
                    content = @Content(schema = @Schema(implementation = MemberTempResponse.class))
            )
    })
    @GetMapping("/me/temp")
    public ResponseEntity<MemberTempResponse> getTempMember(
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberService.getTempMember(member));
    }
}
