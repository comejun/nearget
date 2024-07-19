package com.nearget.back.dto;

import com.nearget.back.domain.Restaurant;
import com.nearget.back.domain.RestaurantsData;
import com.nearget.back.domain.RestaurantsGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantsGroupDTO {
    private Long groupId;
    private String groupName;
    private String thImg;
    private String memberEmail;
    private List<RestaurantsData> restaurantList;

    public static RestaurantsGroupDTO convert(RestaurantsGroup restaurantsGroup){
        RestaurantsGroupDTO restaurantsGroupDTO = RestaurantsGroupDTO.builder()
                .groupId(restaurantsGroup.getGroupId())
                .groupName(restaurantsGroup.getGroupName())
                .thImg(restaurantsGroup.getThImg())
                .memberEmail(restaurantsGroup.getMember().getEmail())
                .restaurantList(restaurantsGroup.getRestaurantList())
                .build();
        return restaurantsGroupDTO;
    }

}