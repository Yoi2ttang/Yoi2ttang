package com.ssafy.yoittang.term.domain.request;

import java.util.List;

public record MemberTermCreateRequest(
        String socialId,
        List<MemberTermAgreementRequest> agreements
) {
}
