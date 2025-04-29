package com.ssafy.yoittang.tile.domain;

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
@Getter
@Builder
@Table(name = "tiles")
@NoArgsConstructor
@AllArgsConstructor
public class Tile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tileId;

    @Column(name = "geohash", unique = true, nullable = false)
    private String geoHash;

    @Column
    private Long zordiacId;

    @Column
    private Long historyId;

}
