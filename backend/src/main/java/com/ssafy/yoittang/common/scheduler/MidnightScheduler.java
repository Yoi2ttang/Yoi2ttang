package com.ssafy.yoittang.common.scheduler;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Objects;

import com.ssafy.yoittang.tile.domain.TileRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ssafy.yoittang.common.domain.ScanResult;
import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;
import com.ssafy.yoittang.tilehistory.domain.redis.TileHistoryRedis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
@RequiredArgsConstructor
public class MidnightScheduler {

    private final TileHistoryRepository tileHistoryRepository;
    private final TileRepository tileRepository;

    @Scheduled(cron = "00 00 0 * * *")
    public void runAtMidnight() {
        log.info("매일 자정에 실행되는 작업입니다. 현재 시간: {}", java.time.LocalDateTime.now());

        Long cursorId = 0L;
        Long beforeCursorId = 0L;

        do {
            ScanResult<TileHistoryRedis> temp = tileHistoryRepository.getTileHistoryRedisBatch(
                    LocalDate.now().toString(),
                    cursorId,
                    100);
            beforeCursorId = cursorId;

            cursorId = temp.nextCursorId();
            tileHistoryRepository.bulkInsertToPostGreSQL(temp.resultList());
            tileHistoryRepository.bulkDeleteInRedis(temp.resultList());
        } while (!Objects.equals(cursorId, beforeCursorId));

        tileHistoryRepository.deleteZSet(LocalDate.now().toString());
        tileRepository.updateTileWithTileHistory();
    }
}
