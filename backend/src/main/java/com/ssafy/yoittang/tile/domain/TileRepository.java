package com.ssafy.yoittang.tile.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TileRepository extends JpaRepository<Tile, Long>, TileJdbcRepository {
    Optional<Tile> findByGeoHash(String geohash);
}
