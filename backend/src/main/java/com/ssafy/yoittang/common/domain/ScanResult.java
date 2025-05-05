package com.ssafy.yoittang.common.domain;

import java.util.List;

public record ScanResult<T>(
    Long nextCursorId,
    List<T> resultList
) { }
