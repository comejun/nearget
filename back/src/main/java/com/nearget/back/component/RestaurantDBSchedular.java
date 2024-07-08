package com.nearget.back.component;

import com.nearget.back.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RestaurantDBSchedular {

    private final RestaurantService restaurantService;

    @Scheduled(fixedDelay = 100000)
    public void scheduleRestaurant() {

        // 오류 발생 전까지 saveAllRestaurant page 0부터 1씩 증가하며 실행
        for (long i = 0; i < 52; i++) {
            restaurantService.saveAllRestaurant(i);
        }


    }

}