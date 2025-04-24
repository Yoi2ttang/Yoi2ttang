package com.ssafy.yoittang.runningpoint.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.locationtech.jts.geom.LineString;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "running_points")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RunningPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long runningPointId;

    @Column(nullable = false)
    private Long runningId;

    @Column
    private Long courseId;

    @Column
    private Integer sequence;

    @Column
    private LocalDateTime arrivalTime;

    // GEOMETRY(LINESTRING, 4326)
    @Column(columnDefinition = "geometry(LineString, 4326)")
    private LineString root;

}
