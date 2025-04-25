package com.ssafy.yoittang.member.domain.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.dto.request.MemberSummaryGetRequest;
import com.ssafy.yoittang.member.domain.dto.response.MemberSummaryGetResponse;

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

    public PageInfo<MemberSummaryGetResponse> searchMembers(MemberSummaryGetRequest request) {
        LocalDate birthStart = request.birthStart();
        LocalDate birthEnd = request.birthEnd();
        String keyword = request.keyword();
        Long next = request.next();
        Integer size = request.size();
        List<MemberSummaryGetResponse> list = memberQueryRepository.searchMembers(
            birthStart,
            birthEnd,
            keyword,
            next,
            size
        );

        return PageInfo.of(list, size, MemberSummaryGetResponse::memberId);
    }
}
