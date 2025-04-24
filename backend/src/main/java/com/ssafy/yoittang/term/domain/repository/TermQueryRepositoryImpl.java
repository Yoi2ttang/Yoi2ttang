package com.ssafy.yoittang.term.domain.repository;

import static com.ssafy.yoittang.term.domain.QTerm.term;
import static com.ssafy.yoittang.term.domain.QTermDetail.termDetail;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.common.exception.NotFoundException;
import com.ssafy.yoittang.term.domain.Term;
import com.ssafy.yoittang.term.domain.response.TermDetailGetResponse;
import com.ssafy.yoittang.term.domain.response.TermDetailItemGetResponse;

import lombok.RequiredArgsConstructor;



@Repository
@RequiredArgsConstructor
public class TermQueryRepositoryImpl implements TermQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public TermDetailGetResponse findTermDetailWithItemsByTermId(Long termId) {
        Term findTerm = jpaQueryFactory
                .selectFrom(term)
                .where(term.termId.eq(termId))
                .fetchOne();

        if (findTerm == null) {
            throw new NotFoundException(ErrorCode.NOT_FOUND_TERM);
        }


        List<TermDetailItemGetResponse> detailGetResponses = jpaQueryFactory
                .select(Projections.constructor(
                        TermDetailItemGetResponse.class,
                        termDetail.termDetailId,
                        termDetail.title,
                        termDetail.content
                ))
                .from(termDetail)
                .where(termDetail.termId.eq(termId))
                .fetch();

        return new TermDetailGetResponse(
                findTerm.getTermId(),
                findTerm.getTitle(),
                findTerm.getSubTitle(),
                detailGetResponses
        );
    }
}
