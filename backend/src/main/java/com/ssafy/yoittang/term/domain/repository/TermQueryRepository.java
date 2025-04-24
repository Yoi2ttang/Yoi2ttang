package com.ssafy.yoittang.term.domain.repository;

import com.ssafy.yoittang.term.domain.response.TermDetailGetResponse;

public interface TermQueryRepository {
    TermDetailGetResponse findTermDetailWithItemsByTermId(Long termId);
}
