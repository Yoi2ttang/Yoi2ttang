package com.ssafy.yoittang.zordiac.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.yoittang.zordiac.domain.Zordiac;
import com.ssafy.yoittang.zordiac.domain.ZordiacName;

public interface ZordiacJpaRepository extends JpaRepository<Zordiac, Long>, ZordiacJdbcRepository {
    @Query("SELECT z.zordiacName FROM Zordiac z WHERE z.zordiacId = :zordiacId")
    ZordiacName findZordiacNameByZordiacId(@Param("zordiacId") Long zordiacId);
}
