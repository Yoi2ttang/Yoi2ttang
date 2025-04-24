package com.ssafy.yoittang.term.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.yoittang.term.domain.TermDetail;

public interface TermDetailJpaRepository extends JpaRepository<TermDetail, Long> {
}
