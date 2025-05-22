package com.ssafy.yoittang.auth.infrastructure;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

public class KakaoMemberInfo {

    @Getter
    @JsonProperty("id")
    private String socialLoginId;

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    public String getNickname() {
        return kakaoAccount.kakaoProfile.nickname;
    }

    public String getProfileImageUrl() {
        return kakaoAccount.kakaoProfile.profileImageUrl;
    }

    public String getEmail() {
        return kakaoAccount.email;
    }

    private static class KakaoAccount {
        @JsonProperty("profile")
        private KakaoProfile kakaoProfile;

        @JsonProperty("email")
        private String email;
    }

    private static class KakaoProfile {
        @JsonProperty("nickname")
        private String nickname;
        @JsonProperty("profile_image_url")
        private String profileImageUrl;
    }
}
