package com.ssafy.yoittang.runningpoint.domain;

import java.util.List;

import com.ssafy.yoittang.runningpoint.domain.dto.request.LocationRecord;

public interface RunningPointJdbcRepository {

    void bulkInsert(List<LocationRecord> locationRecords,
                    Long runningId,
                    Long courseId);

}
