package com.ssafy.yoittang.auth.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AccessTokenResponse {
    private String accessToken;
}
