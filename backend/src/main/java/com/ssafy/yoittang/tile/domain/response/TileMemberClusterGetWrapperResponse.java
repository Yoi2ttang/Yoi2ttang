package com.ssafy.yoittang.tile.domain.response;

import java.util.List;

import lombok.Builder;

@Builder
public record TileMemberClusterGetWrapperResponse(
        List<TileMemberClusterGetResponse> tileClusterGetResponseList
) { }
