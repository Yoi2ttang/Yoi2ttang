package com.ssafy.yoittang.tilehistory.domain.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TileHistoryJpaRepository extends JpaRepository<TileHistoryJpa, Long> {
    @Query("""
            SELECT DISTINCT t.geoHash
            FROM TileHistoryJpa t
            WHERE t.memberId = :memberId
        """)
    List<String> findGeoHashesByMemberId(@Param("memberId") Long memberId);
}
