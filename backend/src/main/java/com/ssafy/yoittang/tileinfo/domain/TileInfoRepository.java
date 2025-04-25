package com.ssafy.yoittang.tileinfo.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TileInfoRepository extends JpaRepository<TileInfo, Long>, TileInfoJdbcRepository {
}
