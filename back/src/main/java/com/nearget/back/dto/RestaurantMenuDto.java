package com.nearget.back.dto;

import com.nearget.back.domain.RestaurantMenu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantMenuDto {

    private String menuName; // 메뉴 이름

    private int price; // 가격

    public static List<RestaurantMenu> toRestaurantMenuEntityList(List<RestaurantMenuDto> menuList){
        return menuList.stream().map(menu -> RestaurantMenu.builder()
                .menuName(menu.getMenuName())
                .price(menu.getPrice())
                .build()).toList();
    }
}
