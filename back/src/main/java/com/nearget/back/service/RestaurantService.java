package com.nearget.back.service;

import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.dto.RestaurantsGroupDTO;

import java.util.List;

public interface RestaurantService {

    void saveAllRestaurant(Long page);

    List<RestaurantDTO> getRestaurantsByCategoryAndBounds(String category, Object bounds);


}
