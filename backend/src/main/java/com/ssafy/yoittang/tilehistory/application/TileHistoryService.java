package com.ssafy.yoittang.tilehistory.application;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ssafy.yoittang.common.exception.ErrorCode;
import com.ssafy.yoittang.common.exception.NotFoundException;
import com.ssafy.yoittang.member.domain.Member;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;
import com.ssafy.yoittang.runningpoint.domain.dto.request.GeoPoint;
import com.ssafy.yoittang.tile.domain.TileRepository;
import com.ssafy.yoittang.tile.domain.request.PersonalTileGetRequest;
import com.ssafy.yoittang.tile.domain.response.PersonalTileGetResponse;
import com.ssafy.yoittang.tile.domain.response.PersonalTileGetResponseWrapper;
import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;


import ch.hsr.geohash.GeoHash;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TileHistoryService {

    private final TileHistoryRepository tileHistoryRepository;
    private final TileRepository tileRepository;
    private final MemberRepository memberRepository;

    public PersonalTileGetResponseWrapper getTileQuery(
            PersonalTileGetRequest personalTileGetRequest,
            Member loginMember
    ) {

        // 친구 혹은 본인 인지 확인필요!
        Member member = memberRepository.findById(personalTileGetRequest.memberId())
                .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));

        String geoHashString = GeoHash.geoHashStringWithCharacterPrecision(
                personalTileGetRequest.lat(),
                personalTileGetRequest.lng(),
                6
        );

        return PersonalTileGetResponseWrapper.builder()
                .zordiacId(member.getZordiacId())
                .personalTileGetResponseList(tileHistoryRepository.getTileHistoryWithQuery(
                        personalTileGetRequest,
                        geoHashString
                ))
                .build();
    }

    public PersonalTileGetResponseWrapper getTileRedis(
            PersonalTileGetRequest personalTileGetRequest,
            Member loginMember
    ) {
        String geoHashString = GeoHash.geoHashStringWithCharacterPrecision(
                personalTileGetRequest.lat(),
                personalTileGetRequest.lng(),
                6
        );

        // 친구 혹은 본인 인지 확인필요
        Member member = memberRepository.findById(personalTileGetRequest.memberId())
                .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_MEMBER));

        List<String> geoHashList = tileHistoryRepository.getTileHistoryRedis(
                geoHashString,
                personalTileGetRequest.memberId()
        );

        List<PersonalTileGetResponse> personalTileGetResponseList = geoHashList.stream()
                .map(tileRepository::findByGeoHash)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(tile -> PersonalTileGetResponse.builder()
                        .geoHash(tile.getGeoHash())
                        .sw(GeoPoint.builder()
                                .lat(tile.getLatSouth())
                                .lng(tile.getLngWest())
                                .build()
                        )
                        .ne(GeoPoint.builder()
                                .lat(tile.getLatNorth())
                                .lng(tile.getLngEast())
                                .build()
                        )
                        .build()
                )
                .toList();

        return PersonalTileGetResponseWrapper.builder()
                .zordiacId(member.getZordiacId())
                .personalTileGetResponseList(personalTileGetResponseList)
                .build();
    }

}
