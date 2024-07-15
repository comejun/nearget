package com.nearget.back.service;

import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.dto.RestaurantsGroupDTO;

import java.util.List;

public interface RestaurantService {

    void saveAllRestaurant(Long page);

    List<RestaurantDTO> getRestaurantsByCategoryAndBounds(String category, Object bounds);

    // 음식점 그룹 리스트 //
    // 이메일로 조회
    List<RestaurantsGroupDTO> getGroupsByEmail(String email);

    // 추가
    void add(RestaurantsGroupDTO restaurantsGroupDTO);

    // 삭제
    void delete(Long groupId);
}
