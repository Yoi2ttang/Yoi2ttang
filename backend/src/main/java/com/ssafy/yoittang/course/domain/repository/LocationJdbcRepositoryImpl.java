package com.ssafy.yoittang.course.domain.repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ssafy.yoittang.course.domain.Location;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class LocationJdbcRepositoryImpl implements LocationJdbcRepository {

    private static final String BULK_INSERT_QUERY =
            "INSERT INTO "
            + "locations(course_id, latitude, longitude) "
            + "VALUES(?, ?, ?)";

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void bulkInsert(List<Location> locations) {
        jdbcTemplate.batchUpdate(BULK_INSERT_QUERY, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int index) throws SQLException {
                Location location = locations.get(index);
                ps.setLong(1, location.getCourseId());
                ps.setDouble(2, location.getLatitude());
                ps.setDouble(3, location.getLongitude());
            }

            @Override
            public int getBatchSize() {
                return locations.size();
            }
        });
    }
}
