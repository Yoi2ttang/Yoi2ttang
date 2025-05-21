package com.ssafy.yoittang.tilehistory.domain.jdbc;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import com.ssafy.yoittang.common.model.PageInfoArgs;
import com.ssafy.yoittang.tilehistory.domain.dto.reqeust.TileMemberRankingRequest;
import com.ssafy.yoittang.tilehistory.domain.dto.response.TileHistoryMemberRankingResponse;
import com.ssafy.yoittang.tilehistory.domain.dto.response.TileMemberRankingResponse;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TileHistoryJdbcRepositoryImpl implements TileHistoryJdbcRepository {

    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public void bulkInsert(List<TileHistoryRedis> tileHistoryRedisList) {
        String sql = "INSERT INTO tile_histories (zodiac_id, member_id, birth_date, geohash, running_point_id) "
                + "VALUES (?, ?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement preparedStatement, int index) throws SQLException {

                TileHistoryRedis now = tileHistoryRedisList.get(index);

                preparedStatement.setLong(1, now.getZodiacId());
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


    @Override
    public TileMemberRankingResponse getTileMemberRankingResponse(
            Long zodiacId,
            TileMemberRankingRequest tileMemberRankingRequest
    ) {

        int size = tileMemberRankingRequest.size() == null ? 10 :
                tileMemberRankingRequest.size() < 0 ? 10 : tileMemberRankingRequest.size();

        LocalDate date = tileMemberRankingRequest.date() == null ? LocalDate.now() : tileMemberRankingRequest.date();

        Timestamp startTime = Timestamp.valueOf(date.atStartOfDay());
        Timestamp endTime = Timestamp.valueOf(date.atTime(23, 59, 59));

        StringBuilder sql = new StringBuilder(
                """
                        SELECT
                          ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, th.member_id ASC) AS rank,
                          th.member_id,
                          m.nickname,
                          m.profile_image_url,
                          COUNT(*) AS count
                        FROM tile_histories AS th
                        JOIN running_points AS rp ON th.running_point_id = rp.running_point_id
                        JOIN members AS m ON th.member_id = m.member_id
                        WHERE rp.arrival_time BETWEEN :start_time AND :end_time
                          AND th.zodiac_id = :zodiac_id
                        GROUP BY th.member_id, m.nickname, m.profile_image_url
                """
        );

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("start_time", startTime)
                .addValue("end_time", endTime)
                .addValue("zodiac_id", zodiacId)
                .addValue("size", size);

        if (tileMemberRankingRequest.lastCount() != null && tileMemberRankingRequest.lastMemberId() != null) {
            sql.append(" HAVING COUNT(*) < :last_count OR (COUNT(*) = :last_count AND th.member_id > :last_member_id) ");
            params.addValue("last_count", tileMemberRankingRequest.lastCount());
            params.addValue("last_member_id", tileMemberRankingRequest.lastMemberId());
        }

        sql.append(" ORDER BY COUNT(*) DESC, th.member_id ASC LIMIT :size");

        List<TileHistoryMemberRankingResponse> tileHistoryMemberRankingResponseList =
                namedParameterJdbcTemplate.query(sql.toString(), params, (rs, rowNum) ->
                TileHistoryMemberRankingResponse.builder()
                        .rank(rs.getInt("rank"))
                        .memberId(rs.getLong("member_id"))
                        .nickname(rs.getString("nickname"))
                        .profileImageUrl(rs.getString("profile_image_url"))
                        .tileCount(rs.getLong("count"))
                        .build()
        );

        return TileMemberRankingResponse.builder()
                .pageInfoArgs(PageInfoArgs.of(
                        tileHistoryMemberRankingResponseList,
                        size,
                        t -> Map.of(
                                "lastCount", t.tileCount(),
                                "lastMemberId", t.memberId()
                        )))
                .build();

    }

}
