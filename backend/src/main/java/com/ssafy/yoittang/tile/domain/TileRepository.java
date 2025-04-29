package com.ssafy.yoittang.tile.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TileRepository extends JpaRepository<Tile, Long>, TileJdbcRepository {
}
