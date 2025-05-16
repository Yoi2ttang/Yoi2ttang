package com.ssafy.yoittang.runningpoint.domain;

import com.ssafy.yoittang.runningpoint.domain.dto.request.LocationRecord;

import java.util.List;

public interface RunningPointJdbcRepository {

    void bulkInsert(List<LocationRecord> locationRecords,
                    Long runningId,
                    Long courseId);

}
