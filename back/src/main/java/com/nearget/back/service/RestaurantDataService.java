package com.nearget.back.service;

import com.nearget.back.dto.RestaurantDTO;

import java.util.List;

public interface RestaurantDataService {

    RestaurantDTO getRestaurant(Long restaurantId);

    List<RestaurantDTO> getTodayRestaurants(Double lat, Double lng);
}
