package com.ssafy.yoittang.tooktilehistory.domain;

import java.time.LocalDate;

public interface TookTileHistoryJdbcRepository {
    void insertTookTileHistory(LocalDate localDate);
}
