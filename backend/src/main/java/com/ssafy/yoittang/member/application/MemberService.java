package com.ssafy.yoittang.member.application;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;


import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.yoittang.common.aws.S3ImageUploader;
import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.common.exception.NotFoundException;
import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.course.domain.dto.response.CompleteCourseResponse;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.course.domain.repository.CourseRepository;
import com.ssafy.yoittang.course.domain.repository.CourseTileJpaRepository;
import com.ssafy.yoittang.member.domain.DisclosureStatus;
import com.ssafy.yoittang.member.domain.Follow;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.dto.request.MemberUpdateRequest;
import com.ssafy.yoittang.member.domain.dto.response.FollowerResponse;
import com.ssafy.yoittang.member.domain.dto.response.FollowingResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberProfileResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberTempResponse;
import com.ssafy.yoittang.member.domain.dto.response.MyProfileEditResponse;
import com.ssafy.yoittang.member.domain.dto.response.MyProfileResponse;
import com.ssafy.yoittang.member.domain.repository.FollowJpaRepository;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;
import com.ssafy.yoittang.running.domain.Running;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.running.domain.dto.response.RunningTimeResponse;
import com.ssafy.yoittang.runningpoint.domain.RunningPointRepository;
import com.ssafy.yoittang.tile.domain.TileRepository;
import com.ssafy.yoittang.tile.domain.response.TileTeamSituationResponse;
import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;
import com.ssafy.yoittang.zodiac.domain.Zodiac;
import com.ssafy.yoittang.zodiac.domain.ZodiacName;
import com.ssafy.yoittang.zodiac.domain.repository.ZodiacJpaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

    private static final int DEFAULT_AUTO_COMPLETE_SIZE = 5;
    private static final int DEFAULT_AUTO_PROFILE_SIZE = 20;

    private final MemberRepository memberRepository;
    private final FollowJpaRepository followJpaRepository;
    private final ZodiacJpaRepository zodiacJpaRepository;
    private final RunningRepository runningRepository;
    private final RunningPointRepository runningPointRepository;
    private final TileHistoryRepository tileHistoryRepository;
    private final CourseRepository courseRepository;
    private final CourseTileJpaRepository courseTileJpaRepository;
    //이 코드는 refactoring 되면 사라질 예정입니다.
    private final TileRepository tileRepository;
    private final S3ImageUploader s3ImageUploader;

    public PageInfo<MemberAutocompleteResponse> getMemberAutocompleteList(String keyword, String pageToken) {
        Long lastMemberId = (pageToken != null) ? Long.parseLong(pageToken) : null;
        List<MemberAutocompleteResponse> members = memberRepository.findAutocompleteMembersByKeyword(
                keyword,
                lastMemberId,
                DEFAULT_AUTO_COMPLETE_SIZE
        );

        return PageInfo.of(members, DEFAULT_AUTO_COMPLETE_SIZE, MemberAutocompleteResponse::memberId);
    }

    public PageInfo<MemberSearchResponse> getMemberSearchList(String keyword, String pageToken, Member member) {
        Long lastMemberId = (pageToken != null) ? Long.parseLong(pageToken) : null;
        List<MemberSearchResponse> members = memberRepository.findSearchMembersByKeyword(
                keyword,
                lastMemberId,
                member.getMemberId(),
                DEFAULT_AUTO_PROFILE_SIZE
        );

        return PageInfo.of(members, DEFAULT_AUTO_PROFILE_SIZE, MemberSearchResponse::memberId);
    }

    @Transactional
    public void createFollow(Long targetId, Member member) {
        Member targetMember = memberRepository.findById(targetId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        if (targetMember.getDisclosure().equals(DisclosureStatus.ONLY_ME)) {
            throw new BadRequestException(ErrorCode.MEMBER_PRIVATE_PROFILE);
        }
        if (followJpaRepository.existsByFromMemberAndToMember(member.getMemberId(), targetId)) {
            Follow follow = followJpaRepository.findByFromMemberAndToMember(member.getMemberId(), targetId)
                    .orElseThrow(() -> new NotFoundException(ErrorCode.FOLLOW_REQUEST_NOT_FOUND));
            if (follow.getIsActive()) {
                throw new BadRequestException(ErrorCode.ALREADY_FOLLOWED);
            }
            follow.updateActive(true);
        } else {
            followJpaRepository.save(
                    Follow.builder()
                            .fromMember(member.getMemberId())
                            .toMember(targetId)
                            .build()
            );
        }
    }

    @Transactional
    public void unfollow(Long targetId, Member member) {
        Member targetMember = memberRepository.findById(targetId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        if (targetMember.getDisclosure().equals(DisclosureStatus.ONLY_ME)) {
            throw new BadRequestException(ErrorCode.MEMBER_PRIVATE_PROFILE);
        }
        Follow follow = followJpaRepository.findByFromMemberAndToMember(member.getMemberId(), targetId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.FOLLOW_HISTORY_NOT_FOUND));
        if (!follow.getIsActive()) {
            throw new BadRequestException(ErrorCode.ALREADY_UNFOLLOWED);
        }
        follow.updateActive(false);
    }

    public PageInfo<FollowingResponse> getFollowingList(String pageToken, Member member) {
        Long lastToId = (pageToken != null) ? Long.parseLong(pageToken) : null;
        List<Long> followingMemberIds = followJpaRepository.findFollowingMemberIds(
                member.getMemberId(),
                lastToId,
                DEFAULT_AUTO_PROFILE_SIZE
        );

        if (followingMemberIds.isEmpty()) {
            return PageInfo.of(List.of(), DEFAULT_AUTO_PROFILE_SIZE, FollowingResponse::memberId);
        }

        List<FollowingResponse> followingMembers = memberRepository.findFollowingByIds(followingMemberIds);

        return PageInfo.of(followingMembers, DEFAULT_AUTO_PROFILE_SIZE, FollowingResponse::memberId);

    }

    public PageInfo<FollowerResponse> getFollowerList(String pageToken, Member member) {
        Long lastToId = (pageToken != null) ? Long.parseLong(pageToken) : null;

        List<Long> followerMemberIds = followJpaRepository.findFollowerMemberIds(
                member.getMemberId(),
                lastToId,
                DEFAULT_AUTO_PROFILE_SIZE
        );

        if (followerMemberIds.isEmpty()) {
            return PageInfo.of(List.of(), DEFAULT_AUTO_PROFILE_SIZE, FollowerResponse::memberId);
        }

        List<FollowerResponse> followerMembers = memberRepository.findFollowerByIds(followerMemberIds);

        return PageInfo.of(followerMembers, DEFAULT_AUTO_PROFILE_SIZE, FollowerResponse::memberId);
    }

    public MemberProfileResponse getMemberProfile(Long targetId, Member member) {
        Member targetMember = memberRepository.findById(targetId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        ZodiacName targetZodiacName = zodiacJpaRepository.findZodiacNameByZodiacId(targetMember.getZodiacId());
        Integer followingCount = followJpaRepository.countFollowings(targetMember.getMemberId());
        Integer followerCount = followJpaRepository.countFollowers(targetMember.getMemberId());
        if (targetMember.getDisclosure().equals(DisclosureStatus.ONLY_ME)) {
            return new MemberProfileResponse(
                    targetMember.getMemberId(),
                    targetMember.getNickname(),
                    targetMember.getProfileImageUrl(),
                    targetZodiacName,
                    null,
                    followingCount,
                    followerCount,
                    null,
                    null,
                    null,
                    null,
                    null
            );
        }
        ZodiacName zodiacName = zodiacJpaRepository.findZodiacNameByZodiacId(targetMember.getZodiacId());
        boolean isFollow = followJpaRepository.existsByFromMemberAndToMemberAndIsActiveTrue(
                member.getMemberId(),
                targetMember.getMemberId()
        );
        Double totalTime = runningRepository.findTotalRunningSecondsByMemberId(targetMember.getMemberId());
        return new MemberProfileResponse(
                targetMember.getMemberId(),
                targetMember.getNickname(),
                targetMember.getProfileImageUrl(),
                zodiacName,
                targetMember.getStateMessage(),
                followingCount,
                followerCount,
                isFollow,
                convertToRunningTimeResponse(totalTime),
                getTotalDistance(targetMember.getMemberId()),
                getTileCount(targetMember.getMemberId()),
                getCourseSummaryByMemberId(targetMember.getMemberId())
        );
    }

    public MyProfileResponse getMyProfile(Member member) {
        Integer followingCount = followJpaRepository.countFollowings(member.getMemberId());
        Integer followerCount = followJpaRepository.countFollowers(member.getMemberId());
        ZodiacName zodiacName = zodiacJpaRepository.findZodiacNameByZodiacId(member.getZodiacId());
        Double totalTime = runningRepository.findTotalRunningSecondsByMemberId(member.getMemberId());
        return new MyProfileResponse(
                member.getMemberId(),
                member.getNickname(),
                member.getProfileImageUrl(),
                zodiacName,
                member.getStateMessage(),
                followingCount,
                followerCount,
                convertToRunningTimeResponse(totalTime),
                getTotalDistance(member.getMemberId()),
                getTileCount(member.getMemberId()),
                getCourseSummaryByMemberId(member.getMemberId())
        );
    }

    public Boolean checkNickname(String nickname) {
        return memberRepository.existByNickname(nickname);
    }

    public List<CompleteCourseResponse> getCompleteCourse(Long targetId) {
        List<CourseSummaryResponse> courseSummaryResponses = courseRepository.findCompleteCoursesByMemberId(targetId);
        List<Long> courseIds = courseSummaryResponses.stream().map(CourseSummaryResponse::courseId).toList();

        Map<Long, Long> totalTiles = courseTileJpaRepository.countCourseTileByCourseIds(courseIds);
        Map<Long, Long> visitedTiles = tileHistoryRepository.countVisitedCourseTilesByMember(
                targetId,
                courseIds
        );

        List<Running> completedRunnings = runningRepository.findCompleteRunning(targetId);

        Map<Long, LocalDateTime> latestEndTimeByCourse = completedRunnings.stream()
                .filter(r -> r.getCourseId() != null)
                .collect(Collectors.toMap(
                        Running::getCourseId,
                        Running::getEndTime,
                        (existing, replacement) -> existing // 이미 최신순이므로 첫 번째 유지
                ));

        return courseSummaryResponses.stream()
                .filter(course -> {
                    Long total = totalTiles.getOrDefault(course.courseId(), 0L);
                    Long visited = visitedTiles.getOrDefault(course.courseId(), 0L);
                    return total > 0 && total.equals(visited);
                })
                .map(course -> new CompleteCourseResponse(
                        course.courseId(),
                        course.courseName(),
                        course.distance(),
                        course.courseImageUrl(),
                        latestEndTimeByCourse.getOrDefault(course.courseId(), null)
                ))
                .toList();
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

    private int getTotalDistance(Long targetId) {
        Double totalDistance = runningPointRepository.findTotalDistanceByMemberId(targetId);
        return totalDistance != null ? totalDistance.intValue() : 0;
    }

    private int getTileCount(Long targetId) {
        Set<String> set1 = new HashSet<>(tileHistoryRepository.findGeoHashesByMemberId(targetId));
        Set<String> set2 = tileHistoryRepository.getTodayGeoHashesFromRedis(targetId, LocalDate.now().toString());
        set1.addAll(set2);
        return set1.size();
    }

    private List<CourseSummaryResponse> getCourseSummaryByMemberId(Long memberId) {
        return courseRepository.findCompleteCoursesByMemberId(memberId);
    }

    @Transactional
    public void updateProfile(MemberUpdateRequest memberUpdateRequest, MultipartFile file, Member member) {
        if (memberRepository.existByNickname(memberUpdateRequest.nickname())
        ) {
            throw new BadRequestException(ErrorCode.DUPLICATE_NICKNAME);
        }
        member.updateProfileInfo(memberUpdateRequest);
        if (file != null) {
            String newProfileImageUrl = s3ImageUploader.uploadMember(file);
            member.updateProfileImage(newProfileImageUrl);
        }

    }

    public MyProfileEditResponse getProfileEdit(Member member) {
        return new MyProfileEditResponse(
                member.getMemberId(),
                member.getEmail(),
                member.getNickname(),
                member.getProfileImageUrl(),
                member.getBirthDate(),
                member.getStateMessage() != null ? member.getStateMessage() : "",
                member.getDisclosure(),
                member.getGender(),
                member.getWeight()
        );
    }

    //이 코드는 refactoring 되면 사라질 예정입니다.
    public MemberTempResponse getTempMember(Member member) {

        Zodiac zodiac = zodiacJpaRepository.findById(member.getZodiacId())
                .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_ZORDIAC));

        List<TileTeamSituationResponse> tileSituationList =  tileRepository.getTileSituation();

        TileTeamSituationResponse myTeam = tileSituationList.stream()
                .filter(t -> t.zodiacId().equals(zodiac.getZodiacId()))
                .findFirst()
                .orElse(null);

        Integer ranking = myTeam == null ? null : myTeam.rank();

        Long tileCount = myTeam == null ? null : myTeam.tileCount();

        return MemberTempResponse.builder()
                .nickname(member.getNickname())
                .zodiacId(zodiac.getZodiacId())
                .zodiacName(zodiac.getZodiacName().getKoreanName())
                .ranking(ranking)
                .tileCount(tileCount)
                .build();
    }

    @Scheduled(cron = "0 0 1 * * *")  // 매일 새벽 1시
    @Transactional
    public void updateDailyRunningStats() {
        List<Member> members = memberRepository.findAll();
        LocalDate targetDate = LocalDate.now().minusDays(1);
        LocalDateTime startDate = targetDate.atStartOfDay();
        LocalDateTime endDate = targetDate.plusDays(1).atStartOfDay();
        for (Member member : members) {
            Double totalSeconds = runningRepository.findTotalRunningSecondsByMemberIdAndDateRange(
                    member.getMemberId(),
                    startDate,
                    endDate
            );
            int additionalTime = totalSeconds != null ? totalSeconds.intValue() : 0;

            List<Object[]> dailyDistances = runningPointRepository.findDailyDistancesRaw(
                    member.getMemberId(),
                    startDate,
                    endDate
            );
            int additionalDistance = dailyDistances.stream()
                    .mapToInt(row -> row[1] != null ? ((Number) row[1]).intValue() : 0)
                    .sum();

            if (additionalTime > 0 || additionalDistance > 0) {
                member.updateRunningStats(additionalTime, additionalDistance);
            }
        }
    }
}

