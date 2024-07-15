package com.nearget.back.controller;

import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.service.RestaurantDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/restaurant")
@RequiredArgsConstructor
@Slf4j
public class RestaurantController {

    private final RestaurantDataService restaurantDataService;

    // 음식점 조회
    @GetMapping("/{restaurantId}")
    public RestaurantDTO getRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        return restaurantDataService.getRestaurant(restaurantId);
    }
}
