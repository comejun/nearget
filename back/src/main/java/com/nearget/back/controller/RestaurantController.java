package com.nearget.back.controller;

import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.service.RestaurantDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    // 오늘의 음식점 조회
    @PostMapping("/today")
    public List<RestaurantDTO> getTodayRestaurants(@RequestBody Double[]latlng) {
        return restaurantDataService.getTodayRestaurants(latlng[0], latlng[1]);
    }

    // 가격순 음식점 조회
    @PostMapping("/price")
    public List<RestaurantDTO> getPriceRestaurants(@RequestBody Double[]latlng) {
        log.info("************ RestaurantController - getPriceRestaurants ***************************");
        List<RestaurantDTO> restaurantDTOList = restaurantDataService.getPriceRestaurants(latlng[0], latlng[1]);
        log.info("************ RestaurantController - getPriceRestaurants -restaurantDTOList : {}", restaurantDTOList);
        return restaurantDTOList;
    }
}
