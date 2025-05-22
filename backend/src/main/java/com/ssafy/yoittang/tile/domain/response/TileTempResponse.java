package com.ssafy.yoittang.tile.domain.response;

import lombok.Builder;

//이 코드는 refactoring 되면 사라질 예정입니다.
@Builder
public record TileTempResponse(
        Long zodiacId,
        Long tileCount
) { }
