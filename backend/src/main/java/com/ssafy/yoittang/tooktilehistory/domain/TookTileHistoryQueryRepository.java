package com.ssafy.yoittang.tooktilehistory.domain;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.yoittang.tooktilehistory.domain.dto.response.TookTileHistoryGroupByPeriod;

public interface TookTileHistoryQueryRepository {

    List<TookTileHistoryGroupByPeriod> getTookTileHistoryGroupByPeriod(
             Long zordiacId,
             LocalDate startDate,
             LocalDate endDate,
             Period period,
             Order order
    );
}
