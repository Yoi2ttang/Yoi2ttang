package com.ssafy.yoittang.zodiac.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.yoittang.zodiac.domain.Zodiac;
import com.ssafy.yoittang.zodiac.domain.ZodiacName;

public interface ZodiacJpaRepository extends JpaRepository<Zodiac, Long>, ZodiacJdbcRepository {
    @Query("SELECT z.zodiacName FROM Zodiac z WHERE z.zodiacId = :zodiacId")
    ZodiacName findZodiacNameByZodiacId(@Param("zodiacId") Long zodiacId);
}
