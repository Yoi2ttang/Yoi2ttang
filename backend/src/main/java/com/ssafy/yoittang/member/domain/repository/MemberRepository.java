package com.ssafy.yoittang.member.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.dto.response.FollowerResponse;
import com.ssafy.yoittang.member.domain.dto.response.FollowingResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final MemberJpaRepository memberJpaRepository;
    private final MemberQueryRepository memberQueryRepository;

    public Optional<Member> findById(Long memberId) {
        return memberJpaRepository.findById(memberId);
    }

    public Optional<Member> findBySocialId(String socialId) {
        return memberJpaRepository.findBySocialId(socialId);
    }

    public Member save(Member member) {
        return memberJpaRepository.save(member);
    }

    public List<MemberAutocompleteResponse> findAutocompleteMembersByKeyword(
            String keyword,
            Long lastMemberId,
            int size
    ) {
        return memberQueryRepository.findAutocompleteMembersByKeyword(keyword, lastMemberId, size);
    }

    public List<MemberSearchResponse> findSearchMembersByKeyword(
            String keyword,
            Long lastMemberId,
            Member member,
            int size
    ) {
        return memberQueryRepository.findSearchMembersByKeyword(keyword, lastMemberId, member, size);
    }

    public List<MemberAutocompleteResponse> findMembersByIds(List<Long> ids) {
        return memberQueryRepository.findMembersByIds(ids);
    }

    public List<FollowingResponse> findFollowingByIds(List<Long> ids) {
        return memberQueryRepository.findFollowingByIds(ids);
    }

    public List<FollowerResponse> findFollowerByIds(List<Long> ids) {
        return memberQueryRepository.findFollowerByIds(ids);
    }

    public boolean existByNickname(String nickname) {
        return memberJpaRepository.existsByNickname(nickname);
    }

    public List<Member> findAll() {
        return memberJpaRepository.findAll();
    }
}
