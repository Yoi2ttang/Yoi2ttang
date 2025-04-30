package com.ssafy.yoittang.running.domain.dto.response;

public record RunningTimeResponse(
        Integer hour,
        Integer minute,
        Integer seconds
) {
}
