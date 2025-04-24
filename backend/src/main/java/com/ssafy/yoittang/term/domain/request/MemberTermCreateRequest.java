package com.ssafy.yoittang.term.domain.request;

import java.util.List;

public record MemberTermCreateRequest(
        List<MemberTermAgreementRequest> agreements
) {
}
