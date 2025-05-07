package com.ssafy.yoittang.course.domain.dto.response;

public record CourseClearMemberResponse(
        Long memberId,
        String nickname,
        String profileImageUrl
) {
}
