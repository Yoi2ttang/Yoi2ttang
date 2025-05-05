package com.ssafy.yoittang.term.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberTermRedisEntity {
    private Long termId;
    private Boolean agree;

    @Builder
    private MemberTermRedisEntity(Long termId, Boolean agree) {
        this.termId = termId;
        this.agree = agree;
    }
}
