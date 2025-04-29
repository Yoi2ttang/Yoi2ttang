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
    public void bulkInsertWithGeoHash(List<String> geohashList) {
        String sql = "INSERT INTO tiles (geohash) VALUES (?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement preparedStatement, int index) throws SQLException {

                String now = geohashList.get(index);

                preparedStatement.setString(1, now);
            }

            @Override
            public int getBatchSize() {
                return geohashList.size();
            }
        });
    }
}
