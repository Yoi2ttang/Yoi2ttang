package com.ssafy.yoittang.zordiac.domain.repository;

import java.util.List;

import com.ssafy.yoittang.zordiac.domain.Zordiac;

public interface ZordiacJdbcRepository {
    void bulkInsert(List<Zordiac> zordiacList);
}
