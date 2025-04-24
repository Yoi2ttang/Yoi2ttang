package com.ssafy.yoittang.running.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RunningRepository extends JpaRepository<Running, Long> {

    Optional<Running> findByRunningIdAndMemberId(Long runningId, Long memberId);

    boolean existsByRunningIdAndMemberId(Long runningId, Long memberId);
}
