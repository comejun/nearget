package com.nearget.back.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant {

    @Id
    // 관리번호로 ID 설정
    private Long id;

    // 음식점 이름
    @Column(length = 500)
    private String name;

    // 음식점 주소
    @Column(length = 500)
    private String address;

    // Lat 좌표값
    @Column(nullable = false)
    private double lat;

    // Lng 좌표값
    @Column(nullable = false)
    private double lng;

    // 음식점 전화번호
    private String phone;

    // TODO 음식점 이미지

    // 음식점 카테고리
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    // TODO 음식점 메뉴

    // TODO 음식점 좋아요 리스트

}
