package com.ssafy.yoittang.term.application;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.common.exception.BadRequestException;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.common.exception.NotFoundException;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.term.domain.MemberTerm;
import com.ssafy.yoittang.term.domain.MemberTermRedisEntity;
import com.ssafy.yoittang.term.domain.Term;
import com.ssafy.yoittang.term.domain.TermType;
import com.ssafy.yoittang.term.domain.repository.MemberTermJpaRepository;
import com.ssafy.yoittang.term.domain.repository.TermDetailJpaRepository;
import com.ssafy.yoittang.term.domain.repository.TermJpaRepository;
import com.ssafy.yoittang.term.domain.request.MemberTermAgreementRequest;
import com.ssafy.yoittang.term.domain.request.MemberTermCreateRequest;
import com.ssafy.yoittang.term.domain.response.TermDetailGetResponse;
import com.ssafy.yoittang.term.domain.response.TermSummaryGetResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TermService {
    private final TermJpaRepository termJpaRepository;
    private final TermDetailJpaRepository termDetailJpaRepository;
    private final MemberTermJpaRepository memberTermJpaRepository;
    private final RedisTemplate<String, List<MemberTermRedisEntity>> redisTemplate;
    private static final String REDIS_PREFIX = "PRE_MEMBER_TERM:";
    private static final Duration TTL = Duration.ofMinutes(30);

    public List<TermSummaryGetResponse> getTermSummary() {
        return termJpaRepository.findAllTermSummaries();
    }

    public TermDetailGetResponse getTermDetailsByTermId(Long termId) {
        return termJpaRepository.findTermDetailWithItemsByTermId(termId);
    }


    public void createMemberTermAgreement(
            MemberTermCreateRequest memberTermCreateRequest
    ) {
        for (MemberTermAgreementRequest item : memberTermCreateRequest.agreements()) {
            Term term = termJpaRepository.findById(item.termId())
                    .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_TERM));

            if (term.getTermType().equals(TermType.MANDATORY) && !Boolean.TRUE.equals(item.agree())) {
                throw new BadRequestException(ErrorCode.MANDATORY_TERM_NOT_AGREED);
            }
        }
        saveMemberTermInRedis(memberTermCreateRequest, memberTermCreateRequest.socialId());
        //saveMemberTerm(memberTermCreateRequest, member);
    }

    @Transactional
    private void saveMemberTermInRedis(
            MemberTermCreateRequest memberTermCreateRequest,
            String socialId
    ) {
        List<MemberTermRedisEntity> list = new ArrayList<>();
        for (MemberTermAgreementRequest item : memberTermCreateRequest.agreements()) {
            Term term = termJpaRepository.findById(item.termId())
                    .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_TERM));
            list.add(
                    MemberTermRedisEntity.builder()
                            .termId(term.getTermId())
                            .agree(item.agree())
                            .build()
            );
        }
        redisTemplate.opsForValue().set(getRedisKey(socialId), list, TTL);
    }

    public void persistMemberTerms(Member member, String socialId) {
        List<MemberTermRedisEntity> terms = getTermAgreementsFromRedis(socialId);

        if (terms == null || terms.isEmpty()) {
            throw new BadRequestException(ErrorCode.INVALID_SIGNUP_TOKEN);
        }
        for (MemberTermRedisEntity term : terms) {
            memberTermJpaRepository.save(MemberTerm.builder()
                    .memberId(member.getMemberId())
                    .termId(term.getTermId())
                    .agree(term.getAgree())
                    .build());
        }
        deleteTermsFromRedis(socialId);
    }

    public List<MemberTermRedisEntity> getTermAgreementsFromRedis(String socialId) {
        return redisTemplate.opsForValue().get(getRedisKey(socialId));
    }

    private String getRedisKey(String socialId) {
        return REDIS_PREFIX + socialId;
    }

    private void deleteTermsFromRedis(String socialId) {
        redisTemplate.delete(getRedisKey(socialId));
    }
}
