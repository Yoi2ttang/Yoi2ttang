package com.ssafy.yoittang.term.domain.request;

public record MemberTermCreateRequest(
        Boolean privacy,
        Boolean location,
        Boolean marketing
) {
}
