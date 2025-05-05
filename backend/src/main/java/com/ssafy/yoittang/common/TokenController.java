package com.ssafy.yoittang.common;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.auth.JwtUtil;
import com.ssafy.yoittang.auth.domain.MemberTokens;
import com.ssafy.yoittang.auth.domain.request.JwtRequest;
import com.ssafy.yoittang.member.domain.DisclosureStatus;
import com.ssafy.yoittang.member.domain.Gender;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.zordiac.domain.ZordiacName;
import com.ssafy.yoittang.zordiac.domain.repository.ZordiacJpaRepository;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class TokenController {

    private final ZordiacJpaRepository zordiacJpaRepository;
    private final JwtUtil jwtUtil;

    @GetMapping("/access-tokens")
    @Operation(description = "테스트용 JWT 토큰을 발급받는다, 이걸로 발급받은 accessToken, refreshToken 으로 테스트 가능")
    public ResponseEntity<MemberTokens> getAccessToken(
            @RequestParam(name = "id") String id
    ) {
        Member member = Member.builder()
                .zordiacId(1L)
                .socialId("1234658789")
                .birthDate(LocalDate.now())
                .nickname("KSH")
                .profileImageUrl("https")
                .gender(Gender.MALE)
                .weight(60.8f)
                .disclosure(DisclosureStatus.ALL)
                .stateMessage(null)
                .build();
        ZordiacName zordiacName = zordiacJpaRepository.findZordiacNameByZordiacId(member.getZordiacId());
        return ResponseEntity.ok(jwtUtil.createLoginToken(new JwtRequest(
                Long.parseLong(id),
                member.getNickname(),
                member.getZordiacId(),
                zordiacName.toString()
        )));
    }
}
