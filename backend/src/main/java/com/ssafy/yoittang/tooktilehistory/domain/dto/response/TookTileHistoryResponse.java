package com.ssafy.yoittang.tooktilehistory.domain.dto.response;

import java.util.List;

import com.ssafy.yoittang.dashboard.domain.dto.response.CoursePointResponse;

import lombok.Builder;

@Builder
public record TookTileHistoryResponse(
    Long zodiacId,
    List<CoursePointResponse> pointList
) { }
