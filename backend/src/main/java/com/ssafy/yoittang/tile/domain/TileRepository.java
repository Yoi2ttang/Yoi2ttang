package com.ssafy.yoittang.tile.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TileRepository extends JpaRepository<Tile, Long>, TileJdbcRepository, TileQueryRepository {
    Optional<Tile> findByGeoHash(String geohash);
}
