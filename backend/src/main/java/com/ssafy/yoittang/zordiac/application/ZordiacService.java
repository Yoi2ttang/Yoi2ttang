package com.ssafy.yoittang.zordiac.application;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.yoittang.zordiac.domain.Zordiac;
import com.ssafy.yoittang.zordiac.domain.ZordiacName;
import com.ssafy.yoittang.zordiac.domain.repository.ZordiacJdbcRepository;
import com.ssafy.yoittang.zordiac.domain.repository.ZordiacJpaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ZordiacService {
    private final ZordiacJpaRepository zordiacJpaRepository;

    @Transactional
    public void save() {
        List<Zordiac> zordiacs = Arrays.stream(ZordiacName.values())
                .map(name -> Zordiac.builder().zordiacName(name).build())
                .collect(Collectors.toList());

        zordiacJpaRepository.bulkInsert(zordiacs);
    }
}
