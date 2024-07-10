package com.nearget.back.controller;

import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/map")
@RequiredArgsConstructor
@Slf4j
public class MapController {

    private final RestaurantService restaurantService;

    @GetMapping("/{category}")
    public List<RestaurantDTO> getMarkerLocation(@PathVariable("category") String category) {
        log.info("********** MapController GET /:category - category : {}", category);
        // Entity Category를 이용해서 해당 카테고리의 위치정보를 가져온다.
        // 이 정보를 이용해서 지도에 마커를 찍는다

        List<RestaurantDTO> RestaurantsMarkerByCategory = new ArrayList<>();
        RestaurantsMarkerByCategory = restaurantService.getRestaurantMarkerByCategory(category);
        log.info("********** MapController GET /:category - studyMarkerByCategory : {}", RestaurantsMarkerByCategory);


        return RestaurantsMarkerByCategory;
    }
}

