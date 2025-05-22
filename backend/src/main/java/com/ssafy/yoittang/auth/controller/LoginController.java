package com.ssafy.yoittang.auth.controller;


import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.auth.domain.Environment;
import com.ssafy.yoittang.auth.domain.request.LoginRequest;
import com.ssafy.yoittang.auth.domain.request.SignupRequest;
import com.ssafy.yoittang.auth.domain.response.AccessTokenResponse;
import com.ssafy.yoittang.auth.domain.response.LoginClientResponse;
import com.ssafy.yoittang.auth.domain.response.LoginResponse;
import com.ssafy.yoittang.auth.service.LoginService;
import com.ssafy.yoittang.member.application.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class LoginController {
    private static final int ONE_WEEK_SECONDS = 604800;

    private final LoginService loginService;
    private final MemberService memberService;

    @PostMapping(value = "/login/kakao")
    public ResponseEntity<LoginClientResponse> kakaoLogin(
            @RequestBody LoginRequest loginRequest,
            HttpServletResponse response
    ) {
        var loginResponse = loginService.login(loginRequest);

        boolean isProd = Environment.WEB.equals(loginRequest.getEnvironment());

        ResponseCookie cookie = ResponseCookie.from("refresh-token", loginResponse.refreshToken())
                .maxAge(ONE_WEEK_SECONDS)
                .secure(isProd) // 로컬에서는 HTTPS가 아니기 때문에 false
                .httpOnly(true)
                .sameSite(isProd ? "None" : "Lax")
                .domain(isProd ? "yoi2ttang.site" : null)// Lax 또는 None 가능. None은 secure=true 필요.
                .path("/")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(loginService.getLoginClientResponse(loginResponse));
    }

    @PostMapping("/signup/kakao")
    public ResponseEntity<LoginClientResponse> signup(
            @RequestBody SignupRequest request,
            HttpServletResponse response
    ) {
        LoginResponse loginResponse = loginService.finalizeSignup(request);
        ResponseCookie cookie = ResponseCookie.from("refresh-token", loginResponse.refreshToken())
                .maxAge(ONE_WEEK_SECONDS)
                .secure(true) // 로컬에서는 HTTPS가 아니기 때문에 false
                .httpOnly(true)
                .sameSite("None")
                .domain("yoi2ttang.site")// Lax 또는 None 가능. None은 secure=true 필요.
                .path("/")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(loginService.getLoginClientResponse(loginResponse));
    }

    @PostMapping("/reissue")
    public ResponseEntity<AccessTokenResponse> reissueToken(
            @CookieValue("refresh-token") String refreshToken,
            @RequestHeader("Authorization") String authHeader
    ) {
        String reissuedToken = loginService.reissueAccessToken(refreshToken, authHeader);
        return ResponseEntity.ok(new AccessTokenResponse(reissuedToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue("refresh-token") String refreshToken
    ) {
        loginService.logout(refreshToken);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam(name = "nickname") String nickname) {
        return ResponseEntity.ok(memberService.checkNickname(nickname));
    }
}
