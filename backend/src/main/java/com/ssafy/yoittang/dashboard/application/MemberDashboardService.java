package com.ssafy.yoittang.dashboard.application;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.ssafy.yoittang.course.domain.repository.CourseJpaRepositoy;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDashboardResponse;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.running.domain.dto.response.RunningTimeResponse;
import com.ssafy.yoittang.runningpoint.domain.RunningPointRepository;
import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberDashboardService {
    private final RunningRepository runningRepository;
    private final RunningPointRepository runningPointRepository;
    private final TileHistoryRepository tileHistoryRepository;
    private final CourseJpaRepositoy courseJpaRepositoy;

    public MemberDashboardResponse getMemberDashboard(Member member) {
        int duration = calculateMembershipDuration(member.getCreatedAt());
        LocalDateTime[] times = getStartAndEndDate();
        Double totalDistance = getLastMonthTotalDistance(member.getMemberId(), times[0], times[1]);
        Double totalTime = getLastMonthRunningSeconds(member.getMemberId(), times[0], times[1]);
        List<Long> coursedIds = getLastMonthCourseCount(member.getMemberId(), times[0], times[1]);
        int countTile = tileHistoryRepository.countDistinctGeohashLastMonth(member.getMemberId(), times[0], times[1]);
        int completeCourseCount = coursedIds.isEmpty() ? 0 : (int) courseJpaRepositoy.countByCourseIdIn(coursedIds);
        return new MemberDashboardResponse(
                member.getMemberId(),
                duration,
                totalDistance,
                convertToRunningTimeResponse(totalTime),
                countTile,
                completeCourseCount
        );
    }

    private int calculateMembershipDuration(LocalDateTime createdAt)  {
        return (int) ChronoUnit.DAYS.between(createdAt.toLocalDate(), LocalDate.now());
    }

    private Double getLastMonthRunningSeconds(Long memberId, LocalDateTime startDate, LocalDateTime endDate) {
        return runningRepository.findTotalRunningSecondsByMemberIdAndDateRange(memberId, startDate, endDate);
    }

    private Double getLastMonthTotalDistance(Long memberId, LocalDateTime startDate, LocalDateTime endDate) {
        return runningPointRepository.findLastMonthDistanceByMemberId(memberId, startDate, endDate);
    }

    private int getTileCount(Long memberId) {
        Set<String> set1 = new HashSet<>(tileHistoryRepository.findGeoHashesByMemberId(memberId));
        Set<String> set2 = tileHistoryRepository.getTodayGeoHashesFromRedis(memberId, LocalDate.now().toString());
        set1.addAll(set2);
        return set1.size();
    }

    private LocalDateTime[] getStartAndEndDate() {
        LocalDate now = LocalDate.now();
        LocalDateTime startDate = now.withDayOfMonth(1).minusMonths(1).atStartOfDay(); // 5월 1일 00:00
        LocalDateTime endDate = now.withDayOfMonth(1).atStartOfDay();
        return new LocalDateTime[] {startDate, endDate};
    }

    private RunningTimeResponse convertToRunningTimeResponse(Double totalSeconds) {
        if (totalSeconds == null) {
            return new RunningTimeResponse(0, 0, 0);
        }

        long total = totalSeconds.longValue();
        int hour = (int) (total / 3600);
        int minute = (int) ((total % 3600) / 60);
        int second = (int) (total % 60);

        return new RunningTimeResponse(hour, minute, second);
    }

    private List<Long> getLastMonthCourseCount(Long memberId, LocalDateTime startDate, LocalDateTime endDate) {
        return runningRepository.findCourseIdsByMemberIdAndStartTimeBetween(memberId, startDate, endDate);
    }

}
