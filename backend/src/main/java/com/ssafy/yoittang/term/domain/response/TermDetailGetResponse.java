package com.ssafy.yoittang.term.domain.response;

import java.util.List;

public record TermDetailGetResponse(
        Long termId,
        String termTitle,
        String termSubTitle,
        List<TermDetailItemGetResponse> termDetailItemGetResponses
) {
}
