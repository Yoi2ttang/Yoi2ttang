package com.ssafy.yoittang.tooktilehistory.application;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.yoittang.dashboard.domain.dto.response.CoursePointResponse;
import com.ssafy.yoittang.tooktilehistory.domain.TookTileHistoryRepository;
import com.ssafy.yoittang.tooktilehistory.domain.dto.response.TookTileHistoryResponse;
import com.ssafy.yoittang.tooktilehistory.domain.dto.resquest.TookTileHistoryGroupByPeriodRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TookTileHistoryService {

    private final TookTileHistoryRepository tookTileHistoryRepository;

    public TookTileHistoryResponse getTookTileHistoryByGroupByPeriod(
            TookTileHistoryGroupByPeriodRequest tookTileHistoryGroupByPeriodRequest
    ) {
        List<CoursePointResponse> pointList
                = tookTileHistoryRepository.getTookTileHistoryGroupByPeriodJdbc(
                    tookTileHistoryGroupByPeriodRequest.zodiacId(),
                    tookTileHistoryGroupByPeriodRequest.startDate(),
                    tookTileHistoryGroupByPeriodRequest.endDate(),
                    tookTileHistoryGroupByPeriodRequest.period(),
                    tookTileHistoryGroupByPeriodRequest.order()
                );

        return TookTileHistoryResponse.builder()
                .zodiacId(tookTileHistoryGroupByPeriodRequest.zodiacId())
                .pointList(pointList)
                .build();
    }

}
