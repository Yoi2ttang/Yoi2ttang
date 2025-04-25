package com.ssafy.yoittang.tilehistory.domain.jpa;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "tile_histories")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TileHistoryJpa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tileHistoryId;

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
