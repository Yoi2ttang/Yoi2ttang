package com.ssafy.yoittang.tile.domain;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TileJdbcRepositoryImpl implements TileJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void bulkInsert(List<Tile> tileList) {
        String sql = "INSERT INTO tiles (geohash, lat_north, lat_south, lng_east, lng_west) "
                + "VALUES (?, ?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement preparedStatement, int index) throws SQLException {

                Tile now = tileList.get(index);

                preparedStatement.setString(1, now.getGeoHash());
                preparedStatement.setDouble(2, now.getLatNorth());
                preparedStatement.setDouble(3, now.getLatSouth());
                preparedStatement.setDouble(4, now.getLngEast());
                preparedStatement.setDouble(5, now.getLngWest());
            }

            @Override
            public int getBatchSize() {
                return tileList.size();
            }
        });
    }

    //나중에 최적화 필요
    @Override
    public void updateTileWithTileHistory() {
        String sql = """
            WITH ranked AS (
                SELECT
                    geohash,
                    zodiac_id,
                    ROW_NUMBER() OVER (PARTITION BY geohash ORDER BY COUNT(zodiac_id) DESC, MIN(birth_date) ASC) AS rn
                FROM
                    tile_histories
                GROUP BY
                    geohash, zodiac_id
            )
            UPDATE tiles t
            SET zodiac_id = (
                SELECT r.zodiac_id
                FROM ranked r
                WHERE r.geohash = t.geohash
                AND r.rn = 1
            )
            WHERE EXISTS (
                SELECT 1
                FROM ranked r
                WHERE r.geohash = t.geohash
                AND r.rn = 1
            );
            """;

        jdbcTemplate.update(sql);
    }
}
