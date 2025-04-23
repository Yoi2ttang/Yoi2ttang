package com.ssafy.yoittang.runningpoint.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RunningPointRepository extends JpaRepository<RunningPoint, Long>, RunningPointQueryRepository {
}
