package com.ssafy.yoittang.term.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.common.exception.NotFoundException;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.term.domain.MemberTerm;
import com.ssafy.yoittang.term.domain.Term;
import com.ssafy.yoittang.term.domain.TermType;
import com.ssafy.yoittang.term.domain.repository.MemberTermJpaRepository;
import com.ssafy.yoittang.term.domain.repository.TermDetailJpaRepository;
import com.ssafy.yoittang.term.domain.repository.TermJpaRepository;
import com.ssafy.yoittang.term.domain.request.MemberTermAgreementRequest;
import com.ssafy.yoittang.term.domain.request.MemberTermCreateRequest;
import com.ssafy.yoittang.term.domain.response.TermDetailGetResponse;
import com.ssafy.yoittang.term.domain.response.TermSummaryGetResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TermService {
    private final TermJpaRepository termJpaRepository;
    private final TermDetailJpaRepository termDetailJpaRepository;
    private final MemberTermJpaRepository memberTermJpaRepository;

    public List<TermSummaryGetResponse> getTermSummary() {
        return termJpaRepository.findAllTermSummaries();
    }

    public TermDetailGetResponse getTermDetailsByTermId(Long termId) {
        return termJpaRepository.findTermDetailWithItemsByTermId(termId);
    }


    public void createMemberTermAgreement(
            MemberTermCreateRequest memberTermCreateRequest,
            Member member
    ) {
        for (MemberTermAgreementRequest item : memberTermCreateRequest.agreements()) {
            Term term = termJpaRepository.findById(item.termId())
                    .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_TERM));

            if (term.getTermType().equals(TermType.MANDATORY) && !Boolean.TRUE.equals(item.agree())) {
                throw new BadRequestException(ErrorCode.MANDATORY_TERM_NOT_AGREED);
            }
        }
        saveMemberTerm(memberTermCreateRequest, member);
    }

    @Transactional
    private void saveMemberTerm(
            MemberTermCreateRequest memberTermCreateRequest,
            Member member
    ) {
        for (MemberTermAgreementRequest item : memberTermCreateRequest.agreements()) {
            Term term = termJpaRepository.findById(item.termId())
                    .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_TERM));

            memberTermJpaRepository.save(
                    memberTermJpaRepository.save(
                            MemberTerm.builder()
                                    .termId(term.getTermId())
                                    .memberId(member.getMemberId())
                                    .agree(item.agree())
                                    .build()
                    )
            );
        }
    }
}
