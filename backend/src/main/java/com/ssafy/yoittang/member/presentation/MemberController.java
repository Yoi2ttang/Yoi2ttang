package com.ssafy.yoittang.member.presentation;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.member.application.MemberService;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberProfileResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;
import com.ssafy.yoittang.member.domain.dto.response.MyProfileResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
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
            @RequestParam(required = false, name = "pageToken") String pageToken
    ) {
        return ResponseEntity.ok(memberService.getMemberSearchList(keyword, pageToken));
    }

    @PostMapping("/{targetId}/follow")
    public ResponseEntity<Void> createFollow(
            @PathVariable("targetId") Long targetId,
            @AuthMember Member member
    ) {
        memberService.createFollow(targetId, member);
        return ResponseEntity.created(URI.create("/api/v1/member/" + targetId + "/follow")).build();
    }

    @DeleteMapping("/{targetId}/unfollow")
    public ResponseEntity<Void> deleteFollow(
            @PathVariable("targetId") Long targetId,
            @AuthMember Member member
    ) {
        memberService.deleteFollow(targetId, member);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/following")
    public ResponseEntity<PageInfo<MemberAutocompleteResponse>> getFollowingList(
            @RequestParam(required = false, name = "pageToken") String pageToken,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberService.getFollowingList(pageToken, member));
    }

    @GetMapping("/follower")
    public ResponseEntity<PageInfo<MemberAutocompleteResponse>> getFollowerList(
            @RequestParam(required = false, name = "pageToken") String pageToken,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(memberService.getFollowerList(pageToken, member));
    }

    @GetMapping("/{targetId}/profile")
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
}
