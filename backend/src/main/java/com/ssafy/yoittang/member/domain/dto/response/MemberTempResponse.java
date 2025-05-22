package com.ssafy.yoittang.member.domain.dto.response;

import lombok.Builder;

//이 코드는 refactoring 되면 사라질 예정입니다.
@Builder
public record MemberTempResponse(
    String nickname,
    Long zodiacId,
    Integer ranking,
    String zodiacName,
    Long tileCount
) { }
