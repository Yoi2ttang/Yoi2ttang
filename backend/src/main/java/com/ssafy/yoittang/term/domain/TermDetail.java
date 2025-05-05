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
@Table(name = "term_details")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TermDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "term_detail_id")
    private Long termDetailId;

    @Column(name = "term_id", nullable = false)
    private Long termId;

    @Column(name = "title", length = 32, nullable = false)
    private String title;

    @Column(name = "content", length = 256)
    private String content;

    @Builder
    private TermDetail(
            Long termId,
            String title,
            String content
    ) {
        this.termId = termId;
        this.title = title;
        this.content = content;
    }
}
