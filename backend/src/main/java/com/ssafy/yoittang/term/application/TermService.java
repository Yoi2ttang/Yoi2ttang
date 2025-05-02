package com.ssafy.yoittang.term.application;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.yoittang.term.domain.repository.TermJpaRepository;
import com.ssafy.yoittang.term.domain.response.TermDetailGetResponse;
import com.ssafy.yoittang.term.domain.response.TermSummaryGetResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TermService {
    private final TermJpaRepository termJpaRepository;

    public List<TermSummaryGetResponse> getTermSummary() {
        return termJpaRepository.findAllTermSummaries();
    }

    public TermDetailGetResponse getTermDetailsByTermId(Long termId) {
        return termJpaRepository.findTermDetailWithItemsByTermId(termId);
    }
}
