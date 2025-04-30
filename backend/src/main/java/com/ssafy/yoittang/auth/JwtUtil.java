package com.ssafy.yoittang.auth;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.ssafy.yoittang.auth.domain.MemberTokens;
import com.ssafy.yoittang.auth.domain.request.JwtRequest;
import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.member.domain.Member;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    private final SecretKey secretKey;
    private final Long accessTokenExpiry;
    private final Long refreshTokenExpiry;

    public JwtUtil(
            @Value("${spring.auth.jwt.secret-key}") final String secretKey,
            @Value("${spring.auth.jwt.access-token-expiry}") final Long accessTokenExpiry,
            @Value("${spring.auth.jwt.refresh-token-expiry}") final Long refreshTokenExpiry
    ) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiry = accessTokenExpiry;
        this.refreshTokenExpiry = refreshTokenExpiry;
    }

    public MemberTokens createLoginToken(String subject) {
        String refreshToken = createToken("", refreshTokenExpiry);
        String accessToken = createToken(subject, accessTokenExpiry);
        return new MemberTokens(refreshToken, accessToken);
    }

    public MemberTokens createLoginToken(Member member) {
        String refreshToken = createToken("", refreshTokenExpiry);
        String accessToken = createToken(member, accessTokenExpiry);
        return new MemberTokens(refreshToken, accessToken);
    }

    public MemberTokens createLoginToken(JwtRequest jwtRequest) {
        String refreshToken = createToken("", refreshTokenExpiry);
        String accessToken = createToken(jwtRequest, accessTokenExpiry);
        return new MemberTokens(refreshToken, accessToken);
    }

    private String createToken(String subject, Long expiredMs) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

    private String createToken(Member member, Long expiredMs) {
        return Jwts.builder()
                .setSubject(member.getMemberId() != null ? member.getMemberId().toString() : "1")
                .claim("nickname", member.getNickname())
                .claim("zordiacId", member.getZordiacId() != null ? member.getZordiacId() : null)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

    private String createToken(JwtRequest jwtRequest, Long expiredMs) {
        return Jwts.builder()
                .setSubject(jwtRequest.memberId().toString())
                .claim("nickname", jwtRequest.nickname())
                .claim("zordiacId", jwtRequest.zordiacId().toString())
                .claim("zordiacTeam", jwtRequest.zordiacName())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

    public String reissueAccessToken(String subject) {
        return createToken(subject, accessTokenExpiry);
    }

    public String getSubject(String token) {
        return parseToken(token)
                .getBody().getSubject();
    }

    private Jws<Claims> parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
    }

    public void validateRefreshToken(String refreshToken) {
        try {
            parseToken(refreshToken);
        } catch (JwtException e) {
            throw new BadRequestException(ErrorCode.INVALID_REFRESH_TOKEN);
        }
    }

    public boolean isAccessTokenValid(String accessToken) {
        try {
            parseToken(accessToken);
        } catch (JwtException e) {
            return false;
        }
        return true;
    }

    public boolean isAccessTokenExpired(String accessToken) {
        try {
            parseToken(accessToken);
        } catch (ExpiredJwtException e) {
            return true;
        }
        return false;
    }
}
