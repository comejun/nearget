package com.nearget.back.util;

public class CustomJWTException extends RuntimeException{
    // 예외 클래스 생성자
    public CustomJWTException(String msg) {
        super(msg);
    }
}
