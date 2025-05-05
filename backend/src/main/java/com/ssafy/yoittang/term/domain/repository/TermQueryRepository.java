package com.ssafy.yoittang.term.domain.repository;

import java.util.List;

import com.ssafy.yoittang.term.domain.response.TermDetailGetResponse;
import com.ssafy.yoittang.term.domain.response.TermSummaryGetResponse;

public interface TermQueryRepository {
    TermDetailGetResponse findTermDetailWithItemsByTermId(Long termId);

    List<TermSummaryGetResponse> findAllTermSummaries();
}
