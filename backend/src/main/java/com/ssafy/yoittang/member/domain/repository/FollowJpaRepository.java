package com.ssafy.yoittang.member.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.yoittang.member.domain.Follow;

public interface FollowJpaRepository extends JpaRepository<Follow, Long>, FollowQueryRepository {
    boolean existsByFromAndTo(Long from, Long to);
}
