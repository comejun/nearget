package com.nearget.back.domain;

import com.nearget.back.dto.RestaurantMenuDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantMenu {

    private String menuName; // 메뉴 이름

    private int price; // 가격

    public RestaurantMenuDto toDto(){
        return RestaurantMenuDto.builder()
                .menuName(menuName)
                .price(price)
                .build();
    }

}
