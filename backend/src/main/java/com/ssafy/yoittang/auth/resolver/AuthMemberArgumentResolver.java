package com.ssafy.yoittang.auth.resolver;

import java.util.Arrays;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.ssafy.yoittang.auth.JwtUtil;
import com.ssafy.yoittang.auth.annotation.AuthMember;
import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthMemberArgumentResolver implements HandlerMethodArgumentResolver {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;


    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthMember.class);
    }

    @Override
    public Member resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory
    ) {
        HttpServletRequest httpServletRequest = webRequest.getNativeRequest(HttpServletRequest.class);

        if (httpServletRequest == null) {
            throw new BadRequestException(ErrorCode.FAILED_TO_VALIDATE_TOKEN);
        }

        String accessToken = extractAccessToken(httpServletRequest);

        if (jwtUtil.isAccessTokenValid(accessToken)) {
            return extractMember(accessToken);
        }

        throw new BadRequestException(ErrorCode.FAILED_TO_VALIDATE_TOKEN);
    }

    private String extractAccessToken(HttpServletRequest httpServletRequest) {
        String authHeader = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null) {
            throw new BadRequestException(ErrorCode.INVALID_ACCESS_TOKEN);
        }
        return authHeader.split(" ")[1];
    }

    private Member extractMember(String accessToken) {
        Long memberId = Long.valueOf(jwtUtil.getSubject(accessToken));

        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.USER_NOT_FOUND));
    }

    private String extractRefreshToken(HttpServletRequest httpServletRequest) {
        Cookie[] cookies = httpServletRequest.getCookies();

        if (cookies == null) {
            throw new BadRequestException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        return Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals("refresh-token"))
                .findFirst()
                .orElseThrow(() -> new BadRequestException(ErrorCode.INVALID_REFRESH_TOKEN))
                .getValue();
    }
}
