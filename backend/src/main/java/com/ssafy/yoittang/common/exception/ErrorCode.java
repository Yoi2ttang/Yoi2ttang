package com.ssafy.yoittang.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    INVALID_REQUEST(1000, "유효하지 않은 요청입니다."),
    DUPLICATE_FOLLOW_REQUEST(1001, "중복 팔로우 요청은 불가합니다."),
    USER_NOT_FOUND(1002, "요청 ID에 해당하는 유저가 존재하지 않습니다."),
    FOLLOW_REQUEST_NOT_FOUND(1003, "요청 ID에 해당하는 팔로우 요청이 존재하지 않습니다."),
    FOLLOW_HISTORY_NOT_FOUND(1004, "팔로우 기록을 찾을 수 없습니다."),
    MEMBER_PRIVATE_PROFILE(1005, "비공개 계정입니다."),
    REVIEW_NOT_FOUND(1006, "요청 ID에 해당하는 리뷰가 존재하지 않습니다."),
    ORDER_NOT_FOUND(1007, "요청 ID에 해당하는 빵이 존재하지 않습니다."),
    ALREADY_FOLLOWED(1008, "이미 팔로우 되어 요청 오류가 발생했습니다."),
    ALREADY_REQUESTED(1009, "이미 팔로우 요청 되어 오류가 발생했습니다."),

    UNABLE_TO_GET_USER_INFO(2001, "소셜 로그인 공급자로부터 유저 정보를 받아올 수 없습니다."),
    UNABLE_TO_GET_ACCESS_TOKEN(2002, "소셜 로그인 공급자로부터 인증 토큰을 받아올 수 없습니다."),
    NOT_SOCIAL_USER(2003, "소셜 로그인 유저가 아닙니다."),
    NOT_NONE_SOCIAL_USER(2004, "일반 로그인 유저가 아닙니다."),
    NOT_ADMIN_USER(2005, "관리자 권한이 없습니다."),
    INVALID_SIGNUP_TOKEN(2006, "회원가입 시 적절하지 않은 토큰 값입니다."),
    ADDITIONAL_SIGNUP_REQUIRED(2007, "회원 가입 절차를 받아야합니다."),
    NOT_FOUND_MEMBER(2008, "존재하지 않는 회원입니다."),

    UNAUTHORIZED_ACCESS(3000, "접근할 수 없는 리소스입니다."),
    INVALID_REFRESH_TOKEN(3001, "유효하지 않은 Refresh Token입니다."),
    FAILED_TO_VALIDATE_TOKEN(3002, "토큰 검증에 실패했습니다."),
    INVALID_ACCESS_TOKEN(3003, "유효하지 않은 Access Token입니다."),
    FORBIDDEN_ORDER_ACCESS(3004, "해당 주문에 대한 접근 권한이 없습니다."),

    RUNNING_NOT_FOUND(4000, "런닝이 존재하지 않습니다."),
    END_TIME_BEFORE_START_TIME(4001, "종료시간이 시작시간보다 클 수 없습니다."),
    ALREADY_COMPLETED(4002, "이미 종료된 런닝입니다."),

    NOT_FOUND_TERM(5001, "존재하지 않는 약관입니다."),
    MANDATORY_TERM_NOT_AGREED(5002, "필수 약관에 동의하지 않았습니다."),

    TOO_LARGE_GEOHASH(6000, "대한민국을 벗어나는 GeoHash 입니다."),
    NOT_FOUND_TILE_INFO(6001, "존재하지않는 타일 정보입니다."),
    MUST_BOTH_NULL(6002, "lastCount와 lastMemberId는 함께 존재하거나 함께 null이어야 합니다."),

    NOT_FOUND_ZORDIAC(7000, "존재하지않는 간지입니다."),

    NOT_FOUND_COURSE(8000, "존재하지 않는 코스입니다.");

    private final int code;
    private final String message;
}
