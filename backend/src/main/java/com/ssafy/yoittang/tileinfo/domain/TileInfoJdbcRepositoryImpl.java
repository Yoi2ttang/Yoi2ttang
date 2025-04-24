package com.ssafy.yoittang.tileinfo.domain;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class TileInfoJdbcRepositoryImpl implements TileInfoJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void bulkInsert(List<TileInfo> tileInfoList) {
        String sql = "INSERT INTO tile_infos (geohash, lat_north, lat_south, lng_east, lng_west) "
                + "VALUES (? , ? , ?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement preparedStatement, int index) throws SQLException {

                TileInfo now = tileInfoList.get(index);

                preparedStatement.setString(1, now.getGeohash());
                preparedStatement.setDouble(2, now.getLatNorth());
                preparedStatement.setDouble(3, now.getLatSouth());
                preparedStatement.setDouble(4, now.getLngEast());
                preparedStatement.setDouble(5, now.getLngWest());

            }

            @Override
            public int getBatchSize() {
                return tileInfoList.size();
            }
        });
    }
}
