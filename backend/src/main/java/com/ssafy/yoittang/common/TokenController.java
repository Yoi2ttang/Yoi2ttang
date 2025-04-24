package com.ssafy.yoittang.common;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.auth.JwtUtil;
import com.ssafy.yoittang.auth.domain.MemberTokens;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TokenController {

    private final JwtUtil jwtUtil;

    @GetMapping("/access-tokens")
    @Operation(description = "테스트용 JWT 토큰을 발급받는다, 이걸로 발급받은 accessToken, refreshToken 으로 테스트 가능")
    public ResponseEntity<MemberTokens> getAccessToken(
            @RequestParam(name = "id") String id
    ) {
        return ResponseEntity.ok(jwtUtil.createLoginToken(id));
    }
}
