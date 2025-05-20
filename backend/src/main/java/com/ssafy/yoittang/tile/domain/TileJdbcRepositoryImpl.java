package com.ssafy.yoittang.tile.domain;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;

import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.response.TileClusterGetResponse;

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

    public List<TileClusterGetResponse> getTileCluster(Long zodiacId,
                                                       String geoHashPrefix) {

        // LEFT(geo_hash, prefixLen) 으로 한 글자 늘린 클러스터 단위
        int prefixLen = Math.min(6, geoHashPrefix.length() + 1);

        /* ---------- SQL 만들기 ---------- */
        StringBuilder sql = new StringBuilder()
                .append("WITH per_tile AS ( ")
                .append("  SELECT zodiac_id, ")
                .append("         geohash, ")
                .append("         ((lat_north + lat_south) / 2.0) AS tile_center_lat, ")
                .append("         ((lng_east  + lng_west ) / 2.0) AS tile_center_lng, ")
                .append("         COUNT(*) AS w ")
                .append("  FROM tiles ")
                .append("  WHERE geohash LIKE ? || '%' ")
                .append("    AND zodiac_id IS NOT NULL ");

        if (zodiacId != null) {
            sql.append("    AND zodiac_id = ? ");
        }

        sql.append("  GROUP BY zodiac_id, geohash ")
                .append("), clustered AS ( ")
                .append("  SELECT zodiac_id, ")
                .append("         LEFT(geohash, ?) AS cluster_prefix, ")
                .append("         SUM(tile_center_lat * w) AS sum_lat_w, ")
                .append("         SUM(tile_center_lng * w) AS sum_lng_w, ")
                .append("         SUM(w) AS total_w ")
                .append("  FROM per_tile ")
                .append("  GROUP BY zodiac_id, cluster_prefix ")
                .append(") ")
                .append("SELECT zodiac_id, ")
                .append("       sum_lat_w / total_w AS center_lat, ")
                .append("       sum_lng_w / total_w AS center_lng, ")
                .append("       total_w AS total_points ")
                .append("FROM clustered");

        /* ---------- 파라미터 배열 ---------- */
        List<Object> params = new ArrayList<>();
        params.add(geoHashPrefix);      // LIKE ? || '%'
        if (zodiacId != null) {
            params.add(zodiacId);       // AND zodiac_id = ?
        }
        params.add(prefixLen);          // LEFT(geo_hash, ?)

        /* ---------- 실행 & 매핑 ---------- */
        return jdbcTemplate.query(
                sql.toString(),
                params.toArray(),
                (rs, rowNum) -> new TileClusterGetResponse(
                        rs.getLong("zodiac_id"),
                        new GeoPoint(
                                rs.getDouble("center_lat"),
                                rs.getDouble("center_lng")
                        ),
                        rs.getLong("total_points")
                )
        );
    }
}
