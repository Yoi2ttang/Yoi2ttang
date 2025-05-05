package com.ssafy.yoittang.tilehistory.domain.redis;

import java.time.LocalDate;

import jakarta.persistence.Column;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
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

    public static String makeTileHistoryId(Long memberId, String geoHash) {
        return memberId + ":" + geoHash;
    }
}
