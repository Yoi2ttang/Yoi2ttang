package com.ssafy.yoittang.zordiac.domain.repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ssafy.yoittang.zordiac.domain.Zordiac;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ZordiacJdbcRepository {

    private static final String BULK_INSERT_QURY =
            "INSERT INTO "
            + "zordiacs(zordiac_name) "
            + "VALUES(?)";

    private final JdbcTemplate jdbcTemplate;

    public void bulkInsert(List<Zordiac> zordiacList) {
        jdbcTemplate.batchUpdate(BULK_INSERT_QURY, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int idx) throws SQLException {
                Zordiac zordiac = zordiacList.get(idx);
                ps.setString(1, zordiac.getZordiacName().name());
            }

            @Override
            public int getBatchSize() {
                return zordiacList.size();
            }
        });
    }
}
