package com.ssafy.yoittang.tile.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.yoittang.tile.domain.response.TileTeamSituationResponse;

public interface TileRepository extends JpaRepository<Tile, Long>, TileJdbcRepository, TileQueryRepository {
    Optional<Tile> findByGeoHash(String geohash);

    @Query(
            value = """
        WITH zodiac_list AS (
            SELECT 1 AS zodiac_id UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
            UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8
            UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12
        )
        SELECT
            zl.zodiac_id AS zodiacId,
            COUNT(t.zodiac_id) AS count,
            RANK() OVER (ORDER BY COUNT(t.zodiac_id) DESC) AS rank
        FROM zodiac_list zl
        LEFT JOIN tiles t ON zl.zodiac_id = t.zodiac_id
        GROUP BY zl.zodiac_id
        ORDER BY count DESC, zodiacId ASC
        """,
            nativeQuery = true
    )
    List<TileTeamSituationResponse> getTileSituation();
}
