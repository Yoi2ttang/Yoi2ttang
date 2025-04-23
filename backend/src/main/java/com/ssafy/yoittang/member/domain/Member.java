package com.ssafy.yoittang.member.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.ssafy.yoittang.common.domain.BaseTimeEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "members")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "zordiac_id", nullable = false)
    private Long zordiacId;

    @Column(name = "social_id", length = 32, nullable = false)
    private String socialId;

    @Column(name = "birth_date", nullable = false)
    private LocalDateTime birthDate;

    @Column(name = "nickname", length = 16, nullable = false)
    private String nickname;

    @Column(name = "profile_image_url", length = 256, nullable = false)
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "disclosure", nullable = false)
    private DisclosureStatus disclosure;

    @Column(name = "state_message", length = 64)
    private String stateMessage;

    @Builder
    private Member(
            Long zordiacId,
            String socialId,
            LocalDateTime birthDate,
            String nickname,
            String profileImageUrl,
            DisclosureStatus disclosure,
            String stateMessage
    ) {
        this.zordiacId = zordiacId;
        this.socialId = socialId;
        this.birthDate = birthDate;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.disclosure = disclosure;
        this.stateMessage = stateMessage;
    }
}
