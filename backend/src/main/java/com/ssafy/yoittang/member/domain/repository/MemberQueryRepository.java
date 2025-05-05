package com.ssafy.yoittang.member.domain.repository;

import java.util.List;

import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;

public interface MemberQueryRepository {
    List<MemberAutocompleteResponse> findAutocompleteMembersByKeyword(String keyword, Long memberId, int size);

    List<MemberSearchResponse> findSearchMembersByKeyword(String keyword, Long lastMemberId, int size);

    List<MemberAutocompleteResponse> findMembersByIds(List<Long> ids);
}
