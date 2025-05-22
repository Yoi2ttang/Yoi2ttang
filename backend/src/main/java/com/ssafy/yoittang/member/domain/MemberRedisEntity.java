package com.ssafy.yoittang.member.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRedisEntity {
    private String socialId;
    private String email;
    private String nickname;
    private String profileImageUrl;
}
