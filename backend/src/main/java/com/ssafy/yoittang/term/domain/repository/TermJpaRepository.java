package com.ssafy.yoittang.term.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.yoittang.term.domain.Term;

public interface TermJpaRepository extends JpaRepository<Term, Long>, TermQueryRepository {
}
