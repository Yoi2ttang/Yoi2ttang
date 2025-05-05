package com.ssafy.yoittang.zordiac.domain;

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
@Table(name = "zordiacs")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Zordiac {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zordiac_id")
    private Long zordiacId;

    @Enumerated(EnumType.STRING)
    @Column(name = "zordiac_name", nullable = false)
    private ZordiacName zordiacName;

    @Column(name = "zordiac_image", length = 256, nullable = false)
    private String zordiacImage;

    @Builder
    private Zordiac(
            ZordiacName zordiacName,
            String zordiacImage
    ) {
        this.zordiacName = zordiacName;
        this.zordiacImage = zordiacImage;
    }
}
