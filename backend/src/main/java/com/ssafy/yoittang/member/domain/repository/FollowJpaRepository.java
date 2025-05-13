package com.ssafy.yoittang.member.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.yoittang.member.domain.Follow;

public interface FollowJpaRepository extends JpaRepository<Follow, Long>, FollowQueryRepository {
    boolean existsByFromMemberAndToMember(Long fromMember, Long toMember);

    boolean existsByFromMemberAndToMemberAndIsActiveTrue(Long fromMember, Long toMember);

    void deleteByFromMemberAndToMember(Long fromMember, Long toMember);  // ✅ 올바른 필드명 사용

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.toMember = :targetId AND f.isActive = true")
    Integer countFollowers(@Param("targetId") Long targetId);

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.fromMember = :targetId AND f.isActive = true")
    Integer countFollowings(@Param("targetId") Long targetId);

    Optional<Follow> findByFromMemberAndToMember(Long fromMember, Long toMember);

}
