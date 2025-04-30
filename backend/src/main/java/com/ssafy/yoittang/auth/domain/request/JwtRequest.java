package com.ssafy.yoittang.auth.domain.request;

public record JwtRequest(
        Long memberId,
        String nickname,
        Long zordiacId,
        String zordiacName
) {
}
