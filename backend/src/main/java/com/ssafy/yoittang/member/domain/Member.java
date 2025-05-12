package com.ssafy.yoittang.member.domain;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.ssafy.yoittang.common.domain.BaseTimeEntity;
import com.ssafy.yoittang.member.domain.dto.request.MemberUpdateRequest;

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
    private Long memberId;

    @Column(name = "zodiac_id", nullable = false)
    private Long zodiacId;

    @Column(name = "social_id", length = 32, nullable = false)
    private String socialId;

    @Column(name = "email", length = 128, nullable = false)
    private String email;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "nickname", length = 16, nullable = false)
    private String nickname;

    @Column(name = "profile_image_url", length = 256, nullable = false)
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "weight", nullable = false)
    private float weight;

    @Enumerated(EnumType.STRING)
    @Column(name = "disclosure", nullable = false)
    private DisclosureStatus disclosure;

    @Column(name = "state_message", length = 64)
    private String stateMessage;

    @Column(name = "running_times", nullable = false)
    private int runningTimes;

    @Column(name = "running_distances", nullable = false)
    private int runningDistances;

    @Builder
    private Member(
            Long zodiacId,
            String socialId,
            String email,
            LocalDate birthDate,
            String nickname,
            String profileImageUrl,
            Gender gender,
            float weight,
            DisclosureStatus disclosure,
            String stateMessage
    ) {
        this.zodiacId = zodiacId;
        this.socialId = socialId;
        this.email = email;
        this.birthDate = birthDate;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.gender = gender;
        this.weight = weight;
        this.disclosure = disclosure;
        this.stateMessage = stateMessage;
        this.runningTimes = 0;
        this.runningDistances = 0;
    }

    public void updateProfileInfo(MemberUpdateRequest memberUpdateRequest) {
        this.nickname = memberUpdateRequest.nickname();
        this.stateMessage = memberUpdateRequest.stateMessage();
        this.disclosure = memberUpdateRequest.disclosureStatus();
        this.weight = memberUpdateRequest.weight();
    }

    public void updateProfileImage(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public void updateRunningStats(int additionalTime, int additionalDistance) {
        this.runningTimes += additionalTime;
        this.runningDistances += additionalDistance;
    }
}
