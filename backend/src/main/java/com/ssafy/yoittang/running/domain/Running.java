package com.ssafy.yoittang.running.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Table(name = "runnings")
@Builder
@Getter
@Entity
public class Running {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long runningId;

    @Column(nullable = false)
    private Long memberId;

    @Column
    private Long courseId;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime startTime;

    @Column
    private LocalDateTime endTime;

    @Setter
    @Column(nullable = false)
    private State state;
}
