package com.nearget.back.dto;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.RestaurantsData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDTO {

    private Long id;
    private String strId;
    private String address;
    private String category;
    private Double lat;
    private Double lng;
    private String name;
    private String phone;
    private String image;
    private List<RestaurantMenuDto> menuList;

    public void changeName(String name){
        this.name = name;
    }
    public void changeImage(String image){
        this.image = image;
    }
    public void changePhone(String phone){
        this.phone = phone;
    }

    public void changeMenuList(List<RestaurantMenuDto> menuList){
        this.menuList = menuList;
    }

    public RestaurantsData toRestaurantsDataEntity(){
        return RestaurantsData.builder()
                .id(id)
                .restaurantName(name)
                .restaurantAddress(address)
                .restaurantImage(image)
                .lat(lat)
                .lng(lng)
                .phone(phone)
                .menuList(RestaurantMenuDto.toRestaurantMenuEntityList(menuList))
                .build();
    }
}
