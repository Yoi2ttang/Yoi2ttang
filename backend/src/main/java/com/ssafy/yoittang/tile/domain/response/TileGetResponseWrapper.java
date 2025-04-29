package com.ssafy.yoittang.tile.domain.response;

import java.util.List;

import lombok.Builder;

@Builder
public record TileGetResponseWrapper(
    List<TileGetResponse> tileGetResponseList
) { }
