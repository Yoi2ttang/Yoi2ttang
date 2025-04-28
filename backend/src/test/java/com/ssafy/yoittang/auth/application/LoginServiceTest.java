package com.ssafy.yoittang.auth.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.util.ReflectionTestUtils;

import com.ssafy.yoittang.auth.JwtUtil;
import com.ssafy.yoittang.auth.domain.Environment;
import com.ssafy.yoittang.auth.domain.MemberTokens;
import com.ssafy.yoittang.auth.domain.RefreshToken;
import com.ssafy.yoittang.auth.domain.request.LoginRequest;
import com.ssafy.yoittang.auth.domain.request.SignupRequest;
import com.ssafy.yoittang.auth.domain.response.LoginResponse;
import com.ssafy.yoittang.auth.infrastructure.KakaoMemberInfo;
import com.ssafy.yoittang.auth.infrastructure.KakaoOAuthProvider;
import com.ssafy.yoittang.auth.repository.RefreshTokenRepository;
import com.ssafy.yoittang.auth.service.LoginService;
import com.ssafy.yoittang.member.domain.DisclosureStatus;
import com.ssafy.yoittang.member.domain.Gender;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.MemberRedisEntity;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;
import com.ssafy.yoittang.term.application.TermService;

@ExtendWith(MockitoExtension.class)
public class LoginServiceTest {

    @InjectMocks
    private LoginService loginService;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @Mock
    private KakaoOAuthProvider kakaoOAuthProvider;

    @Mock
    private TermService termService;

    @Mock
    private RedisTemplate<String, MemberRedisEntity> redisTemplate;

    @Mock
    private ValueOperations<String, MemberRedisEntity> valueOperations;

    @Mock
    private JwtUtil jwtUtil;

    private Member mockMember;

    @BeforeEach
    void setUp() {
        mockMember = Member.builder()
                .zordiacId(1L)
                .socialId("socialId123")
                .birthDate(LocalDate.of(1995, 1, 1))
                .nickname("nickname")
                .profileImageUrl("hello")
                .gender(Gender.MALE)
                .weight(60.8F)
                .disclosure(DisclosureStatus.ALL)
                .stateMessage("basic")
                .build();
        ReflectionTestUtils.setField(mockMember, "memberId", 1L); // DB에 있던 1, 2 다음 3번이라고 가정
    }


    @Test
    void loginTest() {
        LoginRequest request = new LoginRequest("exampleCode", Environment.WEB);

        given(kakaoOAuthProvider.fetchKakaoAccessToken(request.getCode(), request.getEnvironment()))
                .willReturn("kakaoAccessToken");

        KakaoMemberInfo kakaoMemberInfo = mock(KakaoMemberInfo.class);
        given(kakaoMemberInfo.getSocialLoginId()).willReturn("socialId123");

        given(kakaoOAuthProvider.getMemberInfo(anyString()))
                .willReturn(kakaoMemberInfo);

        given(memberRepository.findBySocialId("socialId123"))
                .willReturn(Optional.of(mockMember));

        given(jwtUtil.createLoginToken(anyString()))
                .willReturn(new MemberTokens("refreshToken", "accessToken"));

        LoginResponse response = loginService.login(request);

        assertThat(response.memberId()).isEqualTo(1L);
        assertThat(response.accessToken()).isEqualTo("accessToken");
        assertThat(response.refreshToken()).isEqualTo("refreshToken");
        assertThat(response.socialId()).isNull();

        then(refreshTokenRepository).should(times(1)).save(any());
    }

    @Test
    void logoutTest() {
        String refreshToken = "testRefreshToken";

        loginService.logout(refreshToken);

        then(refreshTokenRepository).should(times(1)).deleteById(refreshToken);
    }

    @Test
    void preRegisterTest() {
        LoginRequest request = new LoginRequest("newCode", Environment.WEB);
        given(kakaoOAuthProvider.fetchKakaoAccessToken(request.getCode(), request.getEnvironment()))
                .willReturn("newKakaoAccessToken");

        KakaoMemberInfo kakaoMemberInfo = mock(KakaoMemberInfo.class);
        given(kakaoOAuthProvider.getMemberInfo(anyString()))
                .willReturn(kakaoMemberInfo);
        given(kakaoMemberInfo.getSocialLoginId()).willReturn("newSocialId123");

        given(memberRepository.findBySocialId("newSocialId123"))
                .willReturn(Optional.empty());

        given(redisTemplate.opsForValue()).willReturn(valueOperations);

        LoginResponse response = loginService.login(request);

        assertThat(response.memberId()).isNull();
        assertThat(response.accessToken()).isNull();
        assertThat(response.refreshToken()).isNull();
        assertThat(response.socialId()).isEqualTo("newSocialId123");

        then(valueOperations).should(times(1)).set(anyString(), any(MemberRedisEntity.class));
    }

    @Test
    void finalizeSignupTest() {
        String newSocialId = "newSocialId123";
        String newNickname = "cachedNickname";
        String newProfileImageUrl = "cachedProfileImageUrl";
        MemberRedisEntity memberRedisEntity = MemberRedisEntity.builder()
                .socialId(newSocialId)
                .nickname(newNickname)
                .profileImageUrl(newProfileImageUrl)
                .build();

        SignupRequest signupRequest = new SignupRequest(
                newSocialId,
                newNickname,
                newProfileImageUrl,
                LocalDate.of(1995, 5, 5),
                Gender.FEMALE,
                52.5F
        );

        given(redisTemplate.opsForValue()).willReturn(valueOperations);
        given(valueOperations.get("PRE_MEMBER:" + newSocialId)).willReturn(memberRedisEntity);

        Member savedMember = Member.builder()
                .zordiacId(11L)
                .socialId(signupRequest.socialId())
                .birthDate(signupRequest.birthDate())
                .nickname(signupRequest.nickname())
                .profileImageUrl(signupRequest.profileImageUrl())
                .gender(signupRequest.gender())
                .weight(signupRequest.weight())
                .disclosure(DisclosureStatus.ALL)
                .stateMessage(null)
                .build();
        ReflectionTestUtils.setField(savedMember, "memberId", 3L);

        given(memberRepository.save(any(Member.class))).willReturn(savedMember);
        given(jwtUtil.createLoginToken(anyString()))
                .willReturn(new MemberTokens("refreshToken", "accessToken"));

        LoginResponse response = loginService.finalizeSignup(signupRequest);

        assertThat(response.memberId()).isEqualTo(3L);
        assertThat(response.accessToken()).isEqualTo("accessToken");
        assertThat(response.refreshToken()).isEqualTo("refreshToken");
        assertThat(response.socialId()).isNull();

        then(termService).should(times(1)).persistMemberTerms(any(Member.class), anyString());
        then(refreshTokenRepository).should(times(1)).save(any(RefreshToken.class));
    }
}
