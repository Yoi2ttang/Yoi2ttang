package com.ssafy.yoittang.tooktilehistory.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TookTileHistoryRepository extends JpaRepository<TookTileHistory, Long>,
        TookTileHistoryJdbcRepository { }
