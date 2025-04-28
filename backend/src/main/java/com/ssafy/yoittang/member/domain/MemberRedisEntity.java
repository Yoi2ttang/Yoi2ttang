package com.ssafy.yoittang.member.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberRedisEntity {
    private String socialId;
    private String nickname;
    private String profileImageUrl;

    @Builder
    private MemberRedisEntity(
            String socialId,
            String nickname,
            String profileImageUrl
    ) {
        this.socialId = socialId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }
}
