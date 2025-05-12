package com.ssafy.yoittang.tilehistory.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.yoittang.common.domain.ScanResult;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyTileResponse;
import com.ssafy.yoittang.tile.domain.request.PersonalTileGetRequest;
import com.ssafy.yoittang.tile.domain.response.PersonalTileGetResponse;
import com.ssafy.yoittang.tilehistory.domain.dto.reqeust.TileMemberRankingRequest;
import com.ssafy.yoittang.tilehistory.domain.dto.response.TileMemberRankingResponse;
import com.ssafy.yoittang.tilehistory.domain.jdbc.TileHistoryJdbcRepository;
import com.ssafy.yoittang.tilehistory.domain.jpa.TileHistoryJpaRepository;
import com.ssafy.yoittang.tilehistory.domain.query.TileHistoryQueryRepository;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TileHistoryRepository {

    private static final String TILE_HISTORIES_KEY = "tile_histories:";

    private final TileHistoryJpaRepository tileHistoryJpaRepository;
    private final TileHistoryJdbcRepository tileHistoryJdbcRepository;
    private final TileHistoryQueryRepository tileHistoryQueryRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public void saveRedis(String localDate, TileHistoryRedis tileHistoryRedis) {

        String tileHistoryId = tileHistoryRedis.getTileHistoryId();

        double score = System.currentTimeMillis();

        redisTemplate.opsForZSet().add(TILE_HISTORIES_KEY + localDate, tileHistoryId, score);

        // tile_histories:member:geohash
        String dataKey = TILE_HISTORIES_KEY + tileHistoryId;
        redisTemplate.opsForValue().set(dataKey, tileHistoryRedis);
    }

    public void bulkInsertToPostGreSQL(List<TileHistoryRedis> batch) {
        tileHistoryJdbcRepository.bulkInsert(batch);
    }

    public boolean existsInZSet(String localDate, String tileHistoryId) {
        String zsetKey = TILE_HISTORIES_KEY + localDate;
        Double score = redisTemplate.opsForZSet().score(zsetKey, tileHistoryId);
        return score != null;
    }

    public ScanResult<TileHistoryRedis> getTileHistoryRedisBatch(
            String localDate,
            Long cursorId,
            int count
    ) {

        Set<Object> tileHistoryIds = redisTemplate.opsForZSet()
                .reverseRange(TILE_HISTORIES_KEY + localDate, cursorId, cursorId + count - 1);

        List<TileHistoryRedis> tileHistories = new ArrayList<>();
        Long nextCursorId = cursorId;

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        if (tileHistoryIds != null && !tileHistoryIds.isEmpty()) {
            for (Object id : tileHistoryIds) {
                String dataKey = TILE_HISTORIES_KEY + (String) id;
                Object object = redisTemplate.opsForValue().get(dataKey);
                TileHistoryRedis tileHistory = objectMapper.convertValue(object, TileHistoryRedis.class);
                if (tileHistory != null) {
                    tileHistories.add(tileHistory);
                }
                nextCursorId++;
            }
        }

        return new ScanResult<>(nextCursorId, tileHistories);
    }

    public List<String> getTileHistoryRedis(String geoHash, Long memberId) {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        //tile_histories:memberId:geohash(6)*
        String keyPattern = TILE_HISTORIES_KEY + memberId + ":" + geoHash + "*";
        Set<String> keys = redisTemplate.keys(keyPattern);

        List<String> geoHashList = new ArrayList<>();

        for (String key : keys) {
            System.out.println(key);
            Object object = redisTemplate.opsForValue().get(key);
            TileHistoryRedis tileHistory = objectMapper.convertValue(object, TileHistoryRedis.class);

            geoHashList.add(tileHistory.getGeoHash());
        }

        return geoHashList;
    }


    public void bulkDeleteInRedis(List<TileHistoryRedis> tileHistories) {
        if (tileHistories == null || tileHistories.isEmpty()) {
            return;
        }

        List<String> deleteKeys = new ArrayList<>();
        List<String> removeZSetMembers = new ArrayList<>();

        for (TileHistoryRedis tileHistory : tileHistories) {
            String tileHistoryId = tileHistory.getTileHistoryId();
            deleteKeys.add(TILE_HISTORIES_KEY + tileHistoryId); // 개별 저장된 데이터 삭제용
            removeZSetMembers.add(tileHistoryId); // ZSet 멤버 삭제용
        }
        redisTemplate.delete(deleteKeys);
        redisTemplate.opsForZSet().remove(TILE_HISTORIES_KEY, removeZSetMembers.toArray());
    }

    public List<PersonalTileGetResponse> getTileHistoryWithQuery(
            PersonalTileGetRequest personalTileGetRequest,
            String geoHashString) {
        return tileHistoryQueryRepository.getTileHistoryWithQuery(personalTileGetRequest, geoHashString);
    }

    public void deleteZSet(String localDate) {
        redisTemplate.delete(TILE_HISTORIES_KEY + ":" + localDate);
    }

    public Set<String> getTodayGeoHashesFromRedis(Long memberId, String localDate) {
        Set<String> geoHashes = new HashSet<>();
        long cursor = 0L;
        int batchSize = 500;

        while (true) {
            ScanResult<TileHistoryRedis> result = getTileHistoryRedisBatch(localDate, cursor, batchSize);
            List<TileHistoryRedis> batch = result.resultList();

            for (TileHistoryRedis redis : batch) {
                if (redis.getMemberId().equals(memberId)) {
                    geoHashes.add(redis.getGeoHash());
                }
            }

            // 다음 커서 위치로 이동
            cursor = result.nextCursorId();

            // 결과 수가 배치보다 작으면 마지막이다
            if (batch.size() < batchSize) {
                break;
            }
        }

        return geoHashes;
    }

    public List<String> findGeoHashesByMemberId(Long memberId) {
        return tileHistoryJpaRepository.findGeoHashesByMemberId(memberId);
    }

    public TileMemberRankingResponse getTileMemberRankingList(
            Long zodiacId,
            TileMemberRankingRequest tileMemberRankingRequest
    ) {
        return tileHistoryJdbcRepository.getTileMemberRankingResponse(zodiacId, tileMemberRankingRequest);
    }

    public int countDistinctGeohashLastMonth(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        return tileHistoryQueryRepository.countDistinctGeohashLastMonth(
                memberId,
                startDate,
                endDate
        );
    }

    public List<MemberDailyTileResponse> findDailyTileCountsByMemberId(
            Long memberId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        return tileHistoryQueryRepository.findDailyTileCountsByMemberId(memberId, startDate, endDate);
    }
}
