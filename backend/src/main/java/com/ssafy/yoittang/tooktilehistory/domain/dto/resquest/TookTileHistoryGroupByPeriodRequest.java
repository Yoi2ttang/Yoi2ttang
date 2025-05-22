package com.ssafy.yoittang.tooktilehistory.domain.dto.resquest;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

import com.ssafy.yoittang.tooktilehistory.domain.Order;
import com.ssafy.yoittang.tooktilehistory.domain.Period;

public record TookTileHistoryGroupByPeriodRequest(
        Long zodiacId,

        @NotNull
        LocalDate startDate,

        @NotNull
        LocalDate endDate,
        Period period,
        Order order

) { }
