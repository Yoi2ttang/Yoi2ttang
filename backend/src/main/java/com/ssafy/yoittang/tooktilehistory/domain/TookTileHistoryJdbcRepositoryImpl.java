package com.ssafy.yoittang.tooktilehistory.domain;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.yoittang.dashboard.domain.dto.response.CoursePointResponse;
import org.springframework.jdbc.core.JdbcTemplate;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TookTileHistoryJdbcRepositoryImpl implements TookTileHistoryJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void insertTookTileHistory(LocalDate localDate) {

        String sql =
            """
                WITH ranked AS (
                    SELECT
                        geohash,
                        zodiac_id,
                        ROW_NUMBER() OVER (
                            PARTITION BY geohash
                            ORDER BY COUNT(zodiac_id) DESC, MIN(birth_date) ASC
                        ) AS rn
                    FROM tile_histories
                    GROUP BY geohash, zodiac_id
                )
                INSERT INTO took_tile_histories (geohash, took_date, zodiac_id)
                SELECT
                    geohash,
                    ?,
                    zodiac_id
                FROM ranked
                WHERE rn = 1;
            """;

        jdbcTemplate.update(sql, ps -> ps.setDate(1, java.sql.Date.valueOf(localDate)));
    }

    public List<CoursePointResponse> getTookTileHistoryGroupByPeriodJdbc(
            Long zodiacId,
            LocalDate startDate,
            LocalDate endDate,
            Period period,        // DAY | WEEK | MONTH | YEAR | null
            Order order           // ASC | DESC | null(기본 ASC)
    ) {
        /* 1. 날짜 단위 키워드 결정 */
        String keyword = switch (period == null ? Period.DAY : period) {
            case DAY   -> "day";
            case WEEK  -> "week";
            case MONTH -> "month";
            case YEAR  -> "year";
        };

        /* 2. 정렬 방향 */
        String orderDir = (order == Order.DESC) ? "DESC" : "ASC";

        /* 3. SQL — keyword 를 리터럴로 인라인
              cast(date_trunc('month', t.took_date) as date)  */
        String sql = """
            SELECT
                CAST(DATE_TRUNC('%s', t.took_date) AS DATE) AS period,
                COUNT(t.took_tile_history_id)              AS cnt
            FROM took_tile_histories t
            WHERE t.zodiac_id = ?
              AND t.took_date BETWEEN ? AND ?
            GROUP BY period
            ORDER BY period %s
            """.formatted(keyword, orderDir);

        /* 4. 실행 + 매핑 */
        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> new CoursePointResponse(
                        rs.getDate("period").toLocalDate(),   // java.sql.Date → LocalDate
                        rs.getInt("cnt")
                ),
                zodiacId,
                java.sql.Date.valueOf(startDate),
                java.sql.Date.valueOf(endDate)
        );
    }

}
