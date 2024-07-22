package com.nearget.back.service;

import com.nearget.back.dto.PageRequestDTO;
import com.nearget.back.dto.RestaurantDTO;

import java.util.List;

public interface RestaurantDataService {

    RestaurantDTO getRestaurant(Long restaurantId);

    // 오늘의 음식점 조회
    List<RestaurantDTO> getTodayRestaurants(Double lat, Double lng, String category);
    // 가격순 음식점 조회
    List<RestaurantDTO> getPriceRestaurants(Double lat, Double lng, String category);

    // 거리순 음식점 조회
    List<RestaurantDTO> getDistanceRestaurants(Double lat, Double lng, String category, PageRequestDTO pageRequestDTO);

    // 지도 클릭시 음식점 조회용 함수
    List<RestaurantDTO> getRestaurantsByCategoryAndBounds(String category, Object bounds);

}
