package com.ssafy.yoittang.term.domain.request;

public record MemberTermAgreementRequest(
        Long termId,
        Boolean agree
) {
}
