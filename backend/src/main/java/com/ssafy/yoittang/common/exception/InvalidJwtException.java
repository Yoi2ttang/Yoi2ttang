package com.ssafy.yoittang.common.exception;

import lombok.Getter;

@Getter
public class InvalidJwtException extends RuntimeException {

    private int code;
    private String message;

    public InvalidJwtException(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

    public InvalidJwtException(ErrorCode errorCode) {
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
    }
}