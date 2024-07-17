package com.nearget.back.service;

import com.nearget.back.dto.RestaurantDTO;

public interface RestaurantDataService {

    RestaurantDTO getRestaurant(Long restaurantId);
}
