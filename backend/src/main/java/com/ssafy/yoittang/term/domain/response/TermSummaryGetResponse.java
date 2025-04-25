package com.ssafy.yoittang.term.domain.response;

import com.ssafy.yoittang.term.domain.TermType;

public record TermSummaryGetResponse(
        Long termId,
        String title,
        TermType termType
) {
}
