package com.ssafy.yoittang.dashboard.application;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.ssafy.yoittang.course.domain.repository.CourseRepository;
import com.ssafy.yoittang.dashboard.domain.ChangeDirection;
import com.ssafy.yoittang.dashboard.domain.dto.response.DateAndSeconds;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyCompleteCourseResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyDistanceResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyRunningTimeResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDailyTileResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.MemberDashboardResponse;
import com.ssafy.yoittang.dashboard.domain.dto.response.TileChangeRateResponse;
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
    private final CourseRepository courseRepository;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @PostConstruct
    private void initTimeRange() {
        LocalDate now = LocalDate.now();
        startDate = now.withDayOfMonth(1).minusMonths(1).atStartOfDay(); // 5월 1일 00:00
        endDate = now.withDayOfMonth(1).atStartOfDay();
    }

    public MemberDashboardResponse getMemberDashboard(Member member) {
        int duration = calculateMembershipDuration(member.getCreatedAt());
        Double totalDistance = getLastMonthTotalDistance(member.getMemberId(), startDate, endDate);
        Double totalTime = getLastMonthRunningSeconds(member.getMemberId(), startDate, endDate);
        List<Long> coursedIds = getLastMonthCourseCount(member.getMemberId(), startDate, endDate);
        int countTile = tileHistoryRepository.countDistinctGeohashLastMonth(member.getMemberId(), startDate, endDate);
        int completeCourseCount = coursedIds.isEmpty() ? 0 : (int) courseRepository.countByCourseIdIn(coursedIds);
        return new MemberDashboardResponse(
                member.getMemberId(),
                duration,
                totalDistance,
                convertToRunningTimeResponse(totalTime),
                countTile,
                completeCourseCount
        );
    }

    public List<MemberDailyDistanceResponse> getMonthRunDistance(Member member) {
        return runningPointRepository.findDailyDistancesByPeriod(member.getMemberId(), startDate, endDate);
    }

    public List<MemberDailyRunningTimeResponse> getMonthRunningTimes(Member member) {
        List<DateAndSeconds> list =  runningRepository.findDailyRunningSecondsByMemberId(
                member.getMemberId(),
                startDate,
                endDate
        );

        return list.stream()
                .map(entry -> new MemberDailyRunningTimeResponse(
                        entry.date(),
                        convertToRunningTimeResponse(entry.totalSeconds())
                ))
                .toList();
    }

    public List<MemberDailyTileResponse> getMonthTiles(Member member) {
        return tileHistoryRepository.findDailyTileCountsByMemberId(member.getMemberId(), startDate, endDate);
    }

    public List<MemberDailyCompleteCourseResponse> getMonthCompleteCourse(Member member) {
        return courseRepository.findDailyCompletedCourseCountsByMemberId(member.getMemberId(), startDate, endDate);
    }

    public TileChangeRateResponse getDailyTileChangeRate(Member member) {
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        int todayCount = tileHistoryRepository.getTodayGeoHashesFromRedis(
                member.getMemberId(),
                LocalDate.now().toString()
        ).size();

        LocalDateTime startOfYesterday = yesterday.atStartOfDay();
        LocalDateTime endOfYesterday = yesterday.atTime(23, 59, 59);

        int yesterdayCount = tileHistoryRepository.countDistinctGeohashLastMonth(
                member.getMemberId(),
                startOfYesterday,
                endOfYesterday
        );

        if (yesterdayCount == 0 && todayCount == 0) {
            return new TileChangeRateResponse(0.0, ChangeDirection.NO_CHANGE);
        }

        int diff = todayCount - yesterdayCount;

        double rate = (yesterdayCount == 0) ? 100.0 : (double) diff / yesterdayCount * 100.0;

        if (todayCount > yesterdayCount) {
            return new TileChangeRateResponse(rate, ChangeDirection.INCREASE);
        } else if (todayCount == yesterdayCount) {
            return new TileChangeRateResponse(0.0, ChangeDirection.NO_CHANGE);
        } else {
            return new TileChangeRateResponse(rate, ChangeDirection.DECREASE);
        }
    }

    public TileChangeRateResponse getWeeklyTileChangeRate(Member member) {
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        LocalDate thisWeekStart = today.with(DayOfWeek.MONDAY);
        LocalDateTime thisWeekStartDateTime = thisWeekStart.atStartOfDay();
        LocalDateTime thisWeekEndDateTime = yesterday.atTime(23, 59, 59);

        LocalDate lastWeekStart = thisWeekStart.minusWeeks(1);
        LocalDate lastWeekEnd = thisWeekStart.minusDays(1);
        LocalDateTime lastWeekStartDateTime = lastWeekStart.atStartOfDay();
        LocalDateTime lastWeekEndDateTime = lastWeekEnd.atTime(23, 59, 59);

        int todayCount = tileHistoryRepository.getTodayGeoHashesFromRedis(
                member.getMemberId(),
                today.toString()
        ).size();
        int thisWeekCount = todayCount + tileHistoryRepository.countDistinctGeohashLastMonth(
                member.getMemberId(),
                thisWeekStartDateTime,
                thisWeekEndDateTime
        );

        int lastWeekCount = tileHistoryRepository.countDistinctGeohashLastMonth(
                member.getMemberId(),
                lastWeekStartDateTime,
                lastWeekEndDateTime
        );

        if (lastWeekCount == 0 && thisWeekCount == 0) {
            return new TileChangeRateResponse(0.0, ChangeDirection.NO_CHANGE);
        }

        int diff = thisWeekCount - lastWeekCount;

        double rate = (lastWeekCount == 0) ? 100.0 : (double) diff / lastWeekCount * 100.0;

        if (thisWeekCount > lastWeekCount) {
            return new TileChangeRateResponse(rate, ChangeDirection.INCREASE);
        } else if (thisWeekCount == lastWeekCount) {
            return new TileChangeRateResponse(0.0, ChangeDirection.NO_CHANGE);
        } else {
            return new TileChangeRateResponse(rate, ChangeDirection.DECREASE);
        }
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
