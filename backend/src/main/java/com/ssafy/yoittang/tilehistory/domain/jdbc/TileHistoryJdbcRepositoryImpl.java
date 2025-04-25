package com.ssafy.yoittang.tilehistory.domain.jdbc;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class TileHistoryJdbcRepositoryImpl implements TileHistoryJdbcRepository {

    private final JdbcTemplate jdbcTemplate;


    @Override
    public void bulkInsert(List<TileHistoryRedis> tileHistoryRedisList) {
        String sql = "INSERT INTO tile_histories (zordiacId, memberId, birthDate, geoHash, runningPointId) "
                + "VALUES (? ,? , ?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement preparedStatement, int index) throws SQLException {

                TileHistoryRedis now = tileHistoryRedisList.get(index);

                preparedStatement.setLong(1, now.getZordiacId());
                preparedStatement.setLong(2, now.getMemberId());
                preparedStatement.setDate(3, Date.valueOf(now.getBirthDate()));
                preparedStatement.setString(4, now.getGeoHash());
                preparedStatement.setLong(5, now.getRunningPointId());

            }

            @Override
            public int getBatchSize() {
                return tileHistoryRedisList.size();
            }
        });
    }
}
