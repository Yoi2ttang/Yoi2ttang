package com.ssafy.yoittang.term.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "member_terms")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberTerm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_term_id")
    private Long memberTermId;

    @Column(name = "term_id", nullable = false)
    private Long termId;

    @Column(name = "memberId", nullable = false)
    private Long memberId;

    @Column(name = "agree", nullable = false)
    private boolean agree;

    @Builder
    private MemberTerm(
            Long termId,
            Long memberId,
            boolean agree
    ) {
        this.termId = termId;
        this.memberId = memberId;
        this.agree = agree;
    }

}
