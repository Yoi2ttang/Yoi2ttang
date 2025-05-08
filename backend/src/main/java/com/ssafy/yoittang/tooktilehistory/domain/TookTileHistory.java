package com.ssafy.yoittang.tooktilehistory.domain;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "took_tile_histories")
public class TookTileHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tookTileHistoryId;

    @Column(nullable = false, name = "geohash")
    private String geoHash;

    @Column(nullable = false)
    private LocalDate tookDate;

    @Column(nullable = false)
    private Long zordiacId;

}
