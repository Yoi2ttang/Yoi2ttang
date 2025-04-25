package com.ssafy.yoittang.tilehistory.domain;

import org.springframework.stereotype.Repository;

import com.ssafy.yoittang.tilehistory.domain.jpa.TileHistoryJpaRepository;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedisRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TileHistoryRepository {

    private final TileHistoryJpaRepository tileHistoryJpaRepository;
    private final TileHistoryRedisRepository tileHistoryRedisRepository;

    public void saveRedis(TileHistoryRedis tileHistoryRedis) {
        tileHistoryRedisRepository.save(tileHistoryRedis);
    }

    public boolean existsByRedisId(String redisId) {
        return tileHistoryRedisRepository.existsById(redisId);
    }
}
