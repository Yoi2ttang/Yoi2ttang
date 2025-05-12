package com.ssafy.yoittang.member.domain;

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
@Table(name = "follows")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long followId;

    @Column(name = "from_member", nullable = false)
    private Long fromMember;

    @Column(name = "to_member", nullable = false)
    private Long toMember;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Builder
    private Follow(
            Long fromMember,
            Long toMember
    ) {
        this.fromMember = fromMember;
        this.toMember = toMember;
        this.isActive = true;
    }

    public void updateActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
