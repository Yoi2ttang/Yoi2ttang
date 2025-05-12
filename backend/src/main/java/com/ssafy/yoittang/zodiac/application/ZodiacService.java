package com.ssafy.yoittang.zodiac.application;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.zodiac.domain.Zodiac;
import com.ssafy.yoittang.zodiac.domain.ZodiacName;
import com.ssafy.yoittang.zodiac.domain.repository.ZodiacJpaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ZodiacService {
    private final ZodiacJpaRepository zodiacJpaRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    private String prefix;
    private final String suffix = ".png";

    @PostConstruct
    public void init() {
        prefix = "https://" + bucketName + ".s3.ap-northeast-2.amazonaws.com/image/zodiac/";
    }

    @Transactional
    public void save() {
        List<Zodiac> zodiacs = Arrays.stream(ZodiacName.values())
                .map(name -> Zodiac
                        .builder()
                        .zodiacName(name)
                        .zodiacImage(prefix + name.toString() + suffix)
                        .build())
                .collect(Collectors.toList());

        zodiacJpaRepository.bulkInsert(zodiacs);
    }


}
