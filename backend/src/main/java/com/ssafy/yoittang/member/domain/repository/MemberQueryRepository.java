package com.ssafy.yoittang.member.domain.repository;

import java.util.List;

import com.ssafy.yoittang.member.domain.dto.response.FollowResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;

public interface MemberQueryRepository {
    List<MemberAutocompleteResponse> findAutocompleteMembersByKeyword(String keyword, Long memberId, int size);

    List<MemberSearchResponse> findSearchMembersByKeyword(String keyword, Long lastMemberId, Long memberId, int size);

    List<MemberAutocompleteResponse> findMembersByIds(List<Long> ids);

    List<FollowResponse> findFollowingByIds(List<Long> ids, Long memberId);

    List<FollowResponse> findFollowerByIds(List<Long> ids, Long memberId);
}
