package com.nearget.back.service;

import com.nearget.back.dto.RestaurantDTO;

import java.util.List;

public interface RestaurantService {

    void saveAllRestaurant(Long page);

    List<RestaurantDTO> getRestaurantMarkerByCategory(String category);
}
