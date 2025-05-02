package com.ssafy.yoittang.zordiac.application;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.zordiac.domain.Zordiac;
import com.ssafy.yoittang.zordiac.domain.ZordiacName;
import com.ssafy.yoittang.zordiac.domain.repository.ZordiacJpaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ZordiacService {
    private final ZordiacJpaRepository zordiacJpaRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    private String prefix;
    private final String suffix = ".png";

    @PostConstruct
    public void init() {
        prefix = "https://" + bucketName + ".s3.ap-northeast-2.amazonaws.com/image/zordiac/";
    }

    @Transactional
    public void save() {
        List<Zordiac> zordiacs = Arrays.stream(ZordiacName.values())
                .map(name -> Zordiac
                        .builder()
                        .zordiacName(name)
                        .zordiacImage(prefix + name.toString() + suffix)
                        .build())
                .collect(Collectors.toList());

        zordiacJpaRepository.bulkInsert(zordiacs);
    }


}
