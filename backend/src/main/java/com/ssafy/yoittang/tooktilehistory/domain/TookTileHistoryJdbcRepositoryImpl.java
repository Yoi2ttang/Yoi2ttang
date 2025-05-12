package com.ssafy.yoittang.tooktilehistory.domain;

import java.time.LocalDate;

import org.springframework.jdbc.core.JdbcTemplate;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TookTileHistoryJdbcRepositoryImpl implements TookTileHistoryJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void insertTookTileHistory(LocalDate localDate) {

        String sql =
            """
                WITH ranked AS (
                    SELECT
                        geohash,
                        zodiac_id,
                        ROW_NUMBER() OVER (
                            PARTITION BY geohash
                            ORDER BY COUNT(zodiac_id) DESC, MIN(birth_date) ASC
                        ) AS rn
                    FROM tile_histories
                    GROUP BY geohash, zodiac_id
                )
                INSERT INTO took_tile_histories (geohash, took_date, zodiac_id)
                SELECT
                    geohash,
                    ?,
                    zodiac_id
                FROM ranked
                WHERE rn = 1;
            """;

        jdbcTemplate.update(sql, ps -> ps.setDate(1, java.sql.Date.valueOf(localDate)));
    }

}
