package com.ssafy.yoittang.zodiac.domain.repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ssafy.yoittang.zodiac.domain.Zodiac;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ZodiacJdbcRepositoryImpl implements ZodiacJdbcRepository {

    private static final String BULK_INSERT_QURY =
            "INSERT INTO "
                    + "zodiacs(zodiac_name, zodiac_image) "
                    + "VALUES(?, ?)";

    private final JdbcTemplate jdbcTemplate;

    public void bulkInsert(List<Zodiac> zodiacList) {
        jdbcTemplate.batchUpdate(BULK_INSERT_QURY, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int idx) throws SQLException {
                Zodiac zodiac = zodiacList.get(idx);
                ps.setString(1, zodiac.getZodiacName().name());
                ps.setString(2, zodiac.getZodiacImage());
            }

            @Override
            public int getBatchSize() {
                return zodiacList.size();
            }
        });
    }
}
