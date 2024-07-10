package com.nearget.back.domain;

import javax.persistence.*;
import lombok.*;

import java.time.LocalDateTime
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetPlace {

    // 그룹 ID
    @Id
    @GeneratedValue
    private Long id;

    // 그룹 썸네일
    private String thImg = "";

    // 저장한 플레이스그룹 이름
    @Column(length = 500)
    private String GetPlaceName;

    // 그룹 멤버
    @ManyToMany
    @JoinColumn(name = "member_email")
    private Member member;

    // 생성일자
    @Builder.Default
    private LocalDateTime createDate = LocalDateTime.now();

    // 목록
    @ElementCollection
    @Builder.Default
    private List<Restaurant> restaurantList = new ArrayList<>();

    // *************** 그룹 -> 음식점 저장 메소드 ***************

}
