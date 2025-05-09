package com.ssafy.yoittang.member.application;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ssafy.yoittang.common.aws.S3ImageUploader;
import com.ssafy.yoittang.course.domain.repository.CourseRepository;
import com.ssafy.yoittang.member.domain.dto.response.MemberAutocompleteResponse;
import com.ssafy.yoittang.member.domain.repository.FollowJpaRepository;
import com.ssafy.yoittang.member.domain.repository.MemberRepository;
import com.ssafy.yoittang.running.domain.RunningRepository;
import com.ssafy.yoittang.runningpoint.domain.RunningPointRepository;
import com.ssafy.yoittang.tilehistory.domain.TileHistoryRepository;
import com.ssafy.yoittang.zordiac.domain.repository.ZordiacJpaRepository;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

    @InjectMocks
    private MemberService memberService;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private FollowJpaRepository followJpaRepository;

    @Mock
    private ZordiacJpaRepository zordiacJpaRepository;

    @Mock
    private RunningRepository runningRepository;

    @Mock
    private RunningPointRepository runningPointRepository;

    @Mock
    private TileHistoryRepository tileHistoryRepository;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private S3ImageUploader s3ImageUploader;

    @BeforeEach
    void setUp() {
        String keyword = "ssafy";
        String pageToken = null;
        List<MemberAutocompleteResponse> mockResponseList = List.of(
                new MemberAutocompleteResponse(1L, "ssafy1"),
                new MemberAutocompleteResponse(2L, "ssafy2"),
                new MemberAutocompleteResponse(3L, "ssafy3"),
                new MemberAutocompleteResponse(4L, "ssafy4"),
                new MemberAutocompleteResponse(5L, "ksh1"),
                new MemberAutocompleteResponse(6L, "ksh2")
        );
    }
}