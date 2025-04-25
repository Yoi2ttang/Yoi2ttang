package com.ssafy.yoittang.tilehistory.domain;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.redis.connection.DataType;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Repository;

import com.ssafy.yoittang.tilehistory.domain.jdbc.TileHistoryJdbcRepository;
import com.ssafy.yoittang.tilehistory.domain.jpa.TileHistoryJpaRepository;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedisRepository;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TileHistoryRepository {

    private final TileHistoryJpaRepository tileHistoryJpaRepository;
    private final TileHistoryRedisRepository tileHistoryRedisRepository;
    private final TileHistoryJdbcRepository tileHistoryJdbcRepository;
    private final RedisTemplate<String, TileHistoryRedis> redisTemplate;

    public void saveRedis(TileHistoryRedis tileHistoryRedis) {
        tileHistoryRedisRepository.save(tileHistoryRedis);
    }

    public boolean existsByRedisId(String redisId) {
        return tileHistoryRedisRepository.existsById(redisId);
    }

    public List<TileHistoryRedis> getAllTileHistoryRedisInBatches() {
        List<TileHistoryRedis> result = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();

        ScanOptions options = ScanOptions.scanOptions()
                .match("tile_histories:*")
                .count(100)
                .build();

        try (Cursor<byte[]> cursor =
                     redisTemplate.getConnectionFactory().getConnection().scan(options)) {

            while (cursor.hasNext()) {
                String key = new String(cursor.next(), StandardCharsets.UTF_8);

                if (redisTemplate.type(key) == DataType.HASH) {
                    Map<Object, Object> map =
                            redisTemplate.<Object, Object>opsForHash().entries(key);

                    TileHistoryRedis entity =
                            objectMapper.convertValue(map, TileHistoryRedis.class);

//                    for (TileHistoryRedis value : map.values()) {
//                        if (value != null) {
//                            result.add(value);
//                        }
//                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to close Redis cursor", e);
        }
        return result;
    }


    public void bulkInsert(List<TileHistoryRedis> batch) {
        tileHistoryJdbcRepository.bulkInsert(batch);
    }
}
