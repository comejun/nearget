package com.nearget.back.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantsData {

    @Id
    private Long id;

    private String restaurantName;

    private String restaurantAddress;

    @Builder.Default
    @Column(length = 1000)
    private String restaurantImage="";

    @ElementCollection
    @Builder.Default
    private List<RestaurantMenu> menuList = new ArrayList<>();

    // restaurantName을 변경하는 메소드
    public void changeRestaurantName(String restaurantName){
        this.restaurantName = restaurantName;
    }
    // restaurantImage를 변경하는 메소드
    public void changeRestaurantImage(String restaurantImage){
        this.restaurantImage = restaurantImage;
    }


}
