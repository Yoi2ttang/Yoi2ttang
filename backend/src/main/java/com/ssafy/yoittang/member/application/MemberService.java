package com.ssafy.yoittang.member.application;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.yoittang.common.aws.S3ImageUploader;
import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.common.exception.NotFoundException;
import com.ssafy.yoittang.common.model.PageInfo;
import com.ssafy.yoittang.course.domain.dto.response.CourseSummaryResponse;
import com.ssafy.yoittang.course.domain.repository.CourseRepository;
import com.ssafy.yoittang.member.domain.DisclosureStatus;
import com.ssafy.yoittang.member.domain.Follow;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.dto.request.MemberUpdateRequest;
import com.ssafy.yoittang.member.domain.dto.response.FollowerResponse;
import com.ssafy.yoittang.member.domain.dto.response.FollowingResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberProfileResponse;
import com.ssafy.yoittang.member.domain.dto.response.MemberSearchResponse;
import com.ssafy.yoittang.member.domain.dto.response.MyProfileEditResponse;
import com.ssafy.yoittang.member.domain.dto.response.MyProfileResponse;
import com.ssafy.yoittang.member.domain.repository.FollowJpaRepository;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.running.domain.dto.response.RunningTimeResponse;
import com.ssafy.yoittang.runningpoint.domain.RunningPointRepository;
import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;
import com.ssafy.yoittang.zordiac.domain.ZordiacName;
import com.ssafy.yoittang.zordiac.domain.repository.ZordiacJpaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

    private static final int DEFAULT_PAGE_SIZE = 5;

    private final MemberRepository memberRepository;
    private final FollowJpaRepository followJpaRepository;
    private final ZordiacJpaRepository zordiacJpaRepository;
    private final RunningRepository runningRepository;
    private final RunningPointRepository runningPointRepository;
    private final TileHistoryRepository tileHistoryRepository;
    private final CourseRepository courseRepository;
    private final S3ImageUploader s3ImageUploader;

    public PageInfo<MemberAutocompleteResponse> getMemberAutocompleteList(String keyword, String pageToken) {
        Long lastMemberId = (pageToken != null) ? Long.parseLong(pageToken) : null;
        List<MemberAutocompleteResponse> members = memberRepository.findAutocompleteMembersByKeyword(
                keyword,
                lastMemberId,
                DEFAULT_PAGE_SIZE
        );

        return PageInfo.of(members, DEFAULT_PAGE_SIZE, MemberAutocompleteResponse::memberId);
    }

    public PageInfo<MemberSearchResponse> getMemberSearchList(String keyword, String pageToken, Member member) {
        Long lastMemberId = (pageToken != null) ? Long.parseLong(pageToken) : null;
        List<MemberSearchResponse> members = memberRepository.findSearchMembersByKeyword(
                keyword,
                lastMemberId,
                member.getMemberId(),
                DEFAULT_PAGE_SIZE
        );

        return PageInfo.of(members, DEFAULT_PAGE_SIZE, MemberSearchResponse::memberId);
    }

    public void createFollow(Long targetId, Member member) {
        Member targetMember = memberRepository.findById(targetId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        if (targetMember.getDisclosure().equals(DisclosureStatus.ONLY_ME)) {
            throw new BadRequestException(ErrorCode.MEMBER_PRIVATE_PROFILE);
        }
        if (followJpaRepository.existsByFromMemberAndToMember(member.getMemberId(), targetId)) {
            throw new BadRequestException(ErrorCode.ALREADY_FOLLOWED);
        }
        followJpaRepository.save(
                Follow.builder()
                        .fromMember(member.getMemberId())
                        .toMember(targetId)
                        .build()
        );
    }

    public void deleteFollow(Long targetId, Member member) {
        Member targetMember = memberRepository.findById(targetId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        if (targetMember.getDisclosure().equals(DisclosureStatus.ONLY_ME)) {
            throw new BadRequestException(ErrorCode.MEMBER_PRIVATE_PROFILE);
        }
        if (!followJpaRepository.existsByFromMemberAndToMember(member.getMemberId(), targetId)) {
            throw new BadRequestException(ErrorCode.FOLLOW_HISTORY_NOT_FOUND);
        }
        followJpaRepository.deleteByFromMemberAndToMember(member.getMemberId(), targetId);
    }

    public PageInfo<FollowingResponse> getFollowingList(String pageToken, Member member) {
        Long lastToId = (pageToken != null) ? Long.parseLong(pageToken) : null;
        List<Long> followingMemberIds = followJpaRepository.findFollowingMemberIds(
                member.getMemberId(),
                lastToId,
                DEFAULT_PAGE_SIZE
        );

        if (followingMemberIds.isEmpty()) {
            return PageInfo.of(List.of(), DEFAULT_PAGE_SIZE, FollowingResponse::memberId);
        }

        List<FollowingResponse> followingMembers = memberRepository.findFollowingByIds(followingMemberIds);

        return PageInfo.of(followingMembers, DEFAULT_PAGE_SIZE, FollowingResponse::memberId);

    }

    public PageInfo<FollowerResponse> getFollowerList(String pageToken, Member member) {
        Long lastToId = (pageToken != null) ? Long.parseLong(pageToken) : null;

        List<Long> followerMemberIds = followJpaRepository.findFollowerMemberIds(
                member.getMemberId(),
                lastToId,
                DEFAULT_PAGE_SIZE
        );

        if (followerMemberIds.isEmpty()) {
            return PageInfo.of(List.of(), DEFAULT_PAGE_SIZE, FollowerResponse::memberId);
        }

        List<FollowerResponse> followerMembers = memberRepository.findFollowerByIds(followerMemberIds);

        return PageInfo.of(followerMembers, DEFAULT_PAGE_SIZE, FollowerResponse::memberId);
    }

    public MemberProfileResponse getMemberProfile(String nickname, Member member) {
        Member targetMember = memberRepository.findByNickname(nickname)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        Integer followingCount = followJpaRepository.countFollowings(targetMember.getMemberId());
        Integer followerCount = followJpaRepository.countFollowers(targetMember.getMemberId());
        if (targetMember.getDisclosure().equals(DisclosureStatus.ONLY_ME)) {
            return new MemberProfileResponse(
                    targetMember.getMemberId(),
                    targetMember.getNickname(),
                    targetMember.getProfileImageUrl(),
                    null,
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
        ZordiacName zordiacName = zordiacJpaRepository.findZordiacNameByZordiacId(targetMember.getZordiacId());
        boolean isFollow = followJpaRepository.existsByFromMemberAndToMember(
                member.getMemberId(),
                targetMember.getMemberId()
        );
        Double totalTime = runningRepository.findTotalRunningSecondsByMemberId(targetMember.getMemberId());
        return new MemberProfileResponse(
                targetMember.getMemberId(),
                targetMember.getNickname(),
                targetMember.getProfileImageUrl(),
                zordiacName,
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
        ZordiacName zordiacName = zordiacJpaRepository.findZordiacNameByZordiacId(member.getZordiacId());
        Double totalTime = runningRepository.findTotalRunningSecondsByMemberId(member.getMemberId());
        return new MyProfileResponse(
                member.getMemberId(),
                member.getNickname(),
                member.getProfileImageUrl(),
                zordiacName,
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
        member.updateProfileInfo(memberUpdateRequest);
        if (file != null) {
            String newProfileImageUrl = s3ImageUploader.uploadMember(file);
            member.updateProfileImage(newProfileImageUrl);
        }

    }

    public MyProfileEditResponse getProfileEdit(Member member) {
        return new MyProfileEditResponse(
                member.getMemberId(),
                member.getNickname(),
                member.getProfileImageUrl(),
                member.getBirthDate(),
                member.getStateMessage(),
                member.getDisclosure(),
                member.getGender(),
                member.getWeight()
        );
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

