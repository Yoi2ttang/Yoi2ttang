package com.ssafy.yoittang.zodiac.domain;

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
@Table(name = "zodiacs")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Zodiac {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zodiac_id")
    private Long zodiacId;

    @Enumerated(EnumType.STRING)
    @Column(name = "zodiac_name", nullable = false)
    private ZodiacName zodiacName;

    @Column(name = "zodiac_image", length = 256, nullable = false)
    private String zodiacImage;

    @Builder
    private Zodiac(
            ZodiacName zodiacName,
            String zodiacImage
    ) {
        this.zodiacName = zodiacName;
        this.zodiacImage = zodiacImage;
    }
}
