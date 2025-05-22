package com.ssafy.yoittang.course.domain.repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ssafy.yoittang.course.domain.CourseTile;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CourseTileJdbcRepositoryImpl implements CourseTileJdbcRepository {

    private static final String BULK_INSERT_QUERY =
            "INSERT INTO "
            + "course_tiles(course_id, geohash) "
            + "VALUES(?, ?)";

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void bulkInsert(List<CourseTile> courseTiles) {
        jdbcTemplate.batchUpdate(BULK_INSERT_QUERY, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int index) throws SQLException {
                CourseTile courseTile = courseTiles.get(index);
                ps.setLong(1, courseTile.getCourseId());
                ps.setString(2, courseTile.getGeoHash());
            }

            @Override
            public int getBatchSize() {
                return courseTiles.size();
            }
        });
    }
}
