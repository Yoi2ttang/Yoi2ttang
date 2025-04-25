package com.ssafy.yoittang.tileinfo.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TileInfoRepository extends JpaRepository<TileInfo, Long>, TileInfoJdbcRepository {
    Optional<TileInfo> findByGeoHash(String geoHash);
}
