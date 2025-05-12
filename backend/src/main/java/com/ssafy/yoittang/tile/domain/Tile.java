package com.ssafy.yoittang.tile.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    @Column(name = "geohash", nullable = false)
    private String geoHash;

    @Column
    private Long zodiacId;

    @Column(nullable = false)
    private Double latNorth;

    @Column(nullable = false)
    private Double latSouth;

    @Column(nullable = false)
    private Double lngEast;

    @Column(nullable = false)
    private Double lngWest;

}
