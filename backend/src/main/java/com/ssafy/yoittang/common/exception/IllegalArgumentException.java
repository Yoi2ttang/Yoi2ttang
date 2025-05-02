package com.ssafy.yoittang.common.exception;

import lombok.Getter;

@Getter
public class IllegalArgumentException extends RuntimeException {

    private int code;
    private String message;

    public IllegalArgumentException(ErrorCode errorCode) {
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
    }
}
