package com.nearget.back.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Category {

    WESTERN("양식"),CAFE("카페"), STREET("분식"), JAPANESE("일식"), PUB("술집"), CHINESE("중식"), FASTFOOD("패스트푸드"), KOREAN("한식");

    private final String value;
}
