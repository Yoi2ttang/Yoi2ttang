package com.ssafy.yoittang.common.scheduler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
@RequiredArgsConstructor
public class MidnightScheduler {

    private final TileHistoryRepository tileHistoryRepository;

    @Scheduled(cron = "00 00 0 * * *")
    public void runAtMidnight() {
        log.info("매일 자정에 실행되는 작업입니다. 현재 시간: " + java.time.LocalDateTime.now());

        List<TileHistoryRedis> all = new ArrayList<>();
        List<TileHistoryRedis> batch;
        do {
            batch = tileHistoryRepository.getAllTileHistoryRedisInBatches();
            tileHistoryRepository.bulkInsert(batch); // 예: DB 저장
            all.addAll(batch);
        } while (!batch.isEmpty());

    }

}
