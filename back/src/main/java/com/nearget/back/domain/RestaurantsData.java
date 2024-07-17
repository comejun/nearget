package com.nearget.back.domain;

import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.dto.RestaurantMenuDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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

    @Enumerated(EnumType.STRING)
    private Category category;

    private String restaurantAddress;

    @Builder.Default
    @Column(length = 1000)
    private String restaurantImage="";

    // Lat 좌표값
    @Column(nullable = false)
    private double lat;

    // Lng 좌표값
    @Column(nullable = false)
    private double lng;

    // 음식점 전화번호
    private String phone;

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

    public RestaurantDTO toDTO(){

        List< RestaurantMenuDto > menuDtoList = menuList.stream().map(RestaurantMenu::toDto).toList();

        return RestaurantDTO.builder()
                .id(id)
                .strId(String.valueOf(id))
                .name(restaurantName)
                .address(restaurantAddress)
                .category(category)
                .image(restaurantImage)
                .lat(lat)
                .lng(lng)
                .phone(phone)
                .menuList(menuDtoList)
                .build();
    }

}
