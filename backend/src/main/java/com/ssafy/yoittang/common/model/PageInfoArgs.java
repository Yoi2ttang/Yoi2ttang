package com.ssafy.yoittang.common.model;

import java.util.List;
import java.util.Map;
import java.util.function.Function;

public record PageInfoArgs<T>(
        Map<String, Object> pageToken,
        List<T> data,
        boolean hasNext
) {
    public static <T> PageInfoArgs<T> of(
            List<T> data,
            int expectedSize,
            Function<T, Map<String, Object>> pageTokenFunction
    ) {
        if (data.size() < expectedSize) {
            return new PageInfoArgs<>(null, data, false);
        }

        T lastValue = data.get(expectedSize - 1);
        Map<String, Object> token = pageTokenFunction.apply(lastValue);
        return new PageInfoArgs<>(token, data.subList(0, expectedSize), true);
    }
}