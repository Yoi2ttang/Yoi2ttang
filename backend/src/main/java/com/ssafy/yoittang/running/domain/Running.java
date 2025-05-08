package com.ssafy.yoittang.running.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "runnings")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Running {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "running_seq")
    @SequenceGenerator(name = "running_seq", sequenceName = "running_seq", allocationSize = 1)
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long runningId;

    @Column(nullable = false)
    private Long memberId;

    @Column
    private Long courseId;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime startTime;

    @Setter
    @Column
    private LocalDateTime endTime;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private State state;
}
