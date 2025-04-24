package com.ssafy.yoittang.runningpoint.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RunningPointRepository extends JpaRepository<RunningPoint, Long> {
}
