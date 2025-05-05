package com.ssafy.yoittang.auth.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberTokens {
    private final String refreshToken;
    private final String accessToken;
}
