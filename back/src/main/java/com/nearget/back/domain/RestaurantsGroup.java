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

    @Column(nullable = false)
    private String groupName; // 그룹 이름

    @Builder.Default
    private String thImg = "";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private Member member; // 회원

    @ElementCollection
    @Builder.Default
    private List<Restaurant> restaurantList = new ArrayList<>(); // 식당 리스트

    // ** 식당 리스트에 추가 ** //
    public void addRestaurant(Restaurant restaurant) {
        this.restaurantList.add(restaurant);
    }

    // ** 식당 그룹 수정 ** //
    public void changeGroupName(String groupName){this.groupName = groupName;}
    public void changeThImg(String thImg){this.thImg = thImg;}
}

