package com.ssafy.yoittang.term.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.yoittang.term.domain.MemberTerm;

public interface MemberTermJpaRepository extends JpaRepository<MemberTerm, Long> {
}
