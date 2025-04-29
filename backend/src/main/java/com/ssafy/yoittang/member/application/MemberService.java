package com.ssafy.yoittang.member.application;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.member.domain.Follow;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;
import com.ssafy.yoittang.member.domain.repository.FollowJpaRepository;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

    private static final int DEFAULT_PAGE_SIZE = 5;

    private final MemberRepository memberRepository;
    private final FollowJpaRepository followJpaRepository;

    public PageInfo<MemberAutocompleteResponse> getMemberAutocompleteList(String keyword, String pageToken) {
        Long lastMemberId = (pageToken != null) ? Long.parseLong(pageToken) : null;
        List<MemberAutocompleteResponse> members = memberRepository.findAutocompleteMembersByKeyword(
                keyword,
                lastMemberId,
                DEFAULT_PAGE_SIZE
        );

        return PageInfo.of(members, DEFAULT_PAGE_SIZE, MemberAutocompleteResponse::memberId);
    }

    public PageInfo<MemberSearchResponse> getMemberSearchList(String keyword, String pageToken) {
        Long lastMemberId = (pageToken != null) ? Long.parseLong(pageToken) : null;
        List<MemberSearchResponse> members = memberRepository.findSearchMembersByKeyword(
                keyword,
                lastMemberId,
                DEFAULT_PAGE_SIZE
        );

        return PageInfo.of(members, DEFAULT_PAGE_SIZE, MemberSearchResponse::memberId);
    }

    public void createFollow(Long targetId, Member member) {
        if (followJpaRepository.existsByFromAndTo(member.getMemberId(), targetId)) {
            throw new BadRequestException(ErrorCode.ALREADY_FOLLOWED);
        }
        followJpaRepository.save(
                Follow.builder()
                        .from(member.getMemberId())
                        .to(targetId)
                        .build()
        );
    }

    public PageInfo<MemberAutocompleteResponse> getFollowingList(String pageToken, Member member) {
        Long lastToId = (pageToken != null) ? Long.parseLong(pageToken) : null;
        List<Long> followingMemberIds = followJpaRepository.findFollowingMemberIds(
                member.getMemberId(),
                lastToId,
                DEFAULT_PAGE_SIZE
        );

        if (followingMemberIds.isEmpty()) {
            return PageInfo.of(List.of(), DEFAULT_PAGE_SIZE, MemberAutocompleteResponse::memberId);
        }

        List<MemberAutocompleteResponse> followingMembers = memberRepository.findMembersByIds(followingMemberIds);

        return PageInfo.of(followingMembers, DEFAULT_PAGE_SIZE, MemberAutocompleteResponse::memberId);

    }

    public PageInfo<MemberAutocompleteResponse> getFollowerList(String pageToken, Member member) {
        Long lastToId = (pageToken != null) ? Long.parseLong(pageToken) : null;

        List<Long> followerMemberIds = followJpaRepository.findFollowerMemberIds(
                member.getMemberId(),
                lastToId,
                DEFAULT_PAGE_SIZE
        );

        if (followerMemberIds.isEmpty()) {
            return PageInfo.of(List.of(), DEFAULT_PAGE_SIZE, MemberAutocompleteResponse::memberId);
        }

        List<MemberAutocompleteResponse> followerMembers = memberRepository.findMembersByIds(followerMemberIds);

        return PageInfo.of(followerMembers, DEFAULT_PAGE_SIZE, MemberAutocompleteResponse::memberId);
    }
}

