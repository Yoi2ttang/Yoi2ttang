package com.ssafy.yoittang.auth.domain.request;

import com.ssafy.yoittang.auth.domain.Environment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String code;
    private Environment environment;
}
