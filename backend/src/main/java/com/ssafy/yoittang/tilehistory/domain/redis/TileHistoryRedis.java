package com.ssafy.yoittang.tilehistory.domain.redis;

import jakarta.persistence.Column;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@RedisHash(value = "tile_histories", timeToLive = 60 * 60 * 24)
@NoArgsConstructor
@AllArgsConstructor
public class TileHistoryRedis {

    @Id
    private String tileHistoryId;

    @Column(nullable = false)
    private Long zordiacId;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false, name = "geohash")
    private String geoHash;

    @Column(nullable = false)
    private Long runningPointId;
}
