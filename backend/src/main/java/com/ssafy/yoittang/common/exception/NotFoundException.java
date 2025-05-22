package com.ssafy.yoittang.common.exception;

public class NotFoundException extends BadRequestException {

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
