package com.ssafy.yoittang.zodiac.domain.repository;

import java.util.List;

import com.ssafy.yoittang.zodiac.domain.Zodiac;

public interface ZodiacJdbcRepository {
    void bulkInsert(List<Zodiac> zodiacList);
}
