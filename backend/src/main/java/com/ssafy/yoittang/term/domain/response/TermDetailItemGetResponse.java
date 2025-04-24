package com.ssafy.yoittang.term.domain.response;

public record TermDetailItemGetResponse(
        Long termDetailId,
        String termDetailTitle,
        String content
) {
}
