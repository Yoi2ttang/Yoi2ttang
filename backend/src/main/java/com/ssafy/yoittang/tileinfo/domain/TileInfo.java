package com.ssafy.yoittang.tileinfo.domain;

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
@Table(name = "tile_infos")
@NoArgsConstructor
@AllArgsConstructor
public class TileInfo {

    @Id
    @Column(name = "geohash", nullable = false)
    private String geoHash;

    @Column(nullable = false)
    private Double latNorth;

    @Column(nullable = false)
    private Double latSouth;

    @Column(nullable = false)
    private Double lngEast;

    @Column(nullable = false)
    private Double lngWest;
}
