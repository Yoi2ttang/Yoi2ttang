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
}
