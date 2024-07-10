package com.nearget.back.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DistrictEnum {

    GANGNAM("강남구",37.495985,127.066409,322L),
    GANGDONG("강동구",37.549208,127.146482,324L),
    GANGBUK("강북구",37.639938,127.025508,308L),
    GANGSEO("강서구",37.565761,126.822656,315L),
    GURO("구로구",37.495486,126.858121,316L),
    GUMCHEON("금천구",37.457279,126.896228,317L),
    NOWON("노원구",37.654191,127.056790,310L),
    DOBONG("도봉구",37.668952,127.047082,309L),
    DONGDAEMUN("동대문구",37.575759,127.025288,305L),
    MAPO("마포구",37.566283,126.901644,313L),
    SEODAEMUN("서대문구",37.582037,126.935666,312L),
    SEOCHO("서초구",37.476952,127.037810,321L),
    SEONGDONG("성동구",37.550675,127.040962,303L),
    SEONGBUK("성북구",37.606991,127.023218,307L),
    SONGPA("송파구",37.504853,127.114482,323L),
    YANGCHEON("양천구",37.527062,126.856153,314L),
    YEONGDEUNGPO("영등포구",37.520641,126.913924,318L),
    YONGSAN("용산구",37.531100,126.981074,302L),
    EUNPYEONG("은평구",37.617612,126.922700,311L),
    JONGNO("종로구",37.572950,126.979357,300L),
    JUNG("중구",37.563341,126.997985,301L),
    JUNGNANG("중랑구",37.595379,127.093966,306L),
    DONGJAK("동작구",37.502206,126.940844,319L),
    GWANAK("관악구",37.465399,126.943807,320L),
    GWAENGGI("광진구",37.548144,127.085753,304L);

    private final String district;
    private final double lat;
    private final double lng;
    private final Long num;



}
