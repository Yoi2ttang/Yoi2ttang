package com.ssafy.yoittang.tilehistory.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.yoittang.common.domain.ScanResult;
import com.ssafy.yoittang.tilehistory.domain.jdbc.TileHistoryJdbcRepository;
import com.ssafy.yoittang.tilehistory.domain.jpa.TileHistoryJpaRepository;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TileHistoryRepository {

    private static final String TILE_HISTORIES_KEY = "tile_histories";

    private final TileHistoryJpaRepository tileHistoryJpaRepository;
    private final TileHistoryJdbcRepository tileHistoryJdbcRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public void saveRedis(String localDate, TileHistoryRedis tileHistoryRedis) {

        String tileHistoryId = tileHistoryRedis.getTileHistoryId();

        double score = System.currentTimeMillis();

        redisTemplate.opsForZSet().add(TILE_HISTORIES_KEY + ":" + localDate, tileHistoryId, score);

        String dataKey = "tile_histories:" + tileHistoryId;
        redisTemplate.opsForValue().set(dataKey, tileHistoryRedis);
    }

    public boolean existsInZSet(String localDate, String tileHistoryId) {
        String zsetKey = "tile_histories:" + localDate;
        Double score = redisTemplate.opsForZSet().score(zsetKey, tileHistoryId);
        return score != null;
    }

    public ScanResult<TileHistoryRedis> getTileHistoryRedisBatch(
            String localDate,
            Long cursorId,
            int count
    ) {

        Set<Object> tileHistoryIds = redisTemplate.opsForZSet()
                .reverseRange(TILE_HISTORIES_KEY + ":" + localDate, cursorId, cursorId + count - 1);

        List<TileHistoryRedis> tileHistories = new ArrayList<>();
        Long nextCursorId = cursorId;

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        if (tileHistoryIds != null && !tileHistoryIds.isEmpty()) {
            for (Object id : tileHistoryIds) {
                String dataKey = "tile_histories:" + (String) id;
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

    public void bulkInsert(List<TileHistoryRedis> batch) {
        tileHistoryJdbcRepository.bulkInsert(batch);
    }

    public void bulkDelete(List<TileHistoryRedis> tileHistories) {
        if (tileHistories == null || tileHistories.isEmpty()) {
            return;
        }

        List<String> deleteKeys = new ArrayList<>();
        List<String> removeZSetMembers = new ArrayList<>();

        for (TileHistoryRedis tileHistory : tileHistories) {
            String tileHistoryId = tileHistory.getTileHistoryId();
            deleteKeys.add("tile_histories:" + tileHistoryId); // 개별 저장된 데이터 삭제용
            removeZSetMembers.add(tileHistoryId); // ZSet 멤버 삭제용
        }
        redisTemplate.delete(deleteKeys);
        redisTemplate.opsForZSet().remove(TILE_HISTORIES_KEY, removeZSetMembers.toArray());
    }

    public void deleteZSet(String localDate) {
        redisTemplate.delete(TILE_HISTORIES_KEY + ":" + localDate);
    }

}
