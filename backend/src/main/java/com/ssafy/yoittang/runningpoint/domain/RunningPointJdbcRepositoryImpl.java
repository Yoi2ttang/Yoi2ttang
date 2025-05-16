package com.ssafy.yoittang.runningpoint.domain;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.runningpoint.domain.dto.request.LocationRecord;


import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RunningPointJdbcRepositoryImpl implements RunningPointJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void bulkInsert(List<LocationRecord> locationRecords,
                           Long runningId,
                           Long courseId) {
        String sql = "INSERT INTO running_points ("
                + "running_id, course_id, arrival_time, sequence, route) "
                + "VALUES (?, ?, ?, ?, ST_GeomFromText(?, 4326))";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int index) throws SQLException {
                LocationRecord current = locationRecords.get(index);

                ps.setLong(1, runningId);
                ps.setObject(2, courseId, Types.BIGINT);
                ps.setTimestamp(3, Timestamp.valueOf(current.time()));
                ps.setInt(4, index + 1);

                // LineString 생성 (이전 지점이 없으면 자기 자신과 연결)
                GeoPoint from = index > 0 ? locationRecords.get(index - 1).geoPoint() : current.geoPoint();
                GeoPoint to = current.geoPoint();

                String lineStringWKT = String.format("LINESTRING(%f %f, %f %f)",
                        from.lng(), from.lat(),
                        to.lng(), to.lat());

                ps.setString(5, lineStringWKT);
            }

            @Override
            public int getBatchSize() {
                return locationRecords.size();
            }
        });
    }
}
