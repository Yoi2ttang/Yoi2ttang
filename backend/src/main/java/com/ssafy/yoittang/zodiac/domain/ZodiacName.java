package com.ssafy.yoittang.zodiac.domain;

public enum ZodiacName {
    MOUSE("쥐"),
    COW("소"),
    TIGER("호랑이"),
    RABBIT("토끼"),
    DRAGON("용"),
    SNAKE("뱀"),
    HORSE("말"),
    SHEEP("양"),
    MONKEY("원숭이"),
    CHICKEN("닭"),
    DOG("개"),
    PIG("돼지");

    private final String koreanName;

    ZodiacName(String koreanName) {
        this.koreanName = koreanName;
    }

    public String getKoreanName() {
        return koreanName;
    }

    @Override
    public String toString() {
        return koreanName;
    }
}