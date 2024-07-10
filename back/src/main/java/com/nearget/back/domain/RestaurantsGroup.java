package com.nearget.back.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantsGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId; // 그룹 ID

    private String groupName; // 그룹 이름

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private Member member; // 회원

    @ElementCollection
    @Builder.Default
    private List<Long> restaurantList = new ArrayList<>(); // 식당 리스트

}
