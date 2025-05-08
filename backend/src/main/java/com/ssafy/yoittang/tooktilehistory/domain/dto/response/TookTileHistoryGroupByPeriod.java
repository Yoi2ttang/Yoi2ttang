package com.ssafy.yoittang.tooktilehistory.domain.dto.response;


import java.time.LocalDate;

public record TookTileHistoryGroupByPeriod(
    Long count,
    LocalDate date
) { }
