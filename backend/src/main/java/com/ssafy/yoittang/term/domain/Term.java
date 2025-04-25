package com.ssafy.yoittang.term.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "terms")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "term_id")
    private Long termId;

    @Column(name = "title", length = 32, nullable = false)
    private String title;

    @Column(name = "sub_title", length = 32, nullable = false)
    private String subTitle;

    @Enumerated(EnumType.STRING)
    @Column(name = "term_type")
    private TermType termType;

    @Builder
    private Term(
            String title,
            String subTitle,
            TermType termType
    ) {
        this.title = title;
        this.subTitle = subTitle;
        this.termType = termType;
    }
}
