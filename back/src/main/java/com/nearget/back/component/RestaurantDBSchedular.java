package com.nearget.back.component;

import com.nearget.back.domain.DistrictEnum;
import com.nearget.back.service.DistrictService;
import com.nearget.back.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class RestaurantDBSchedular {

    private final RestaurantService restaurantService;
    private final DistrictService districtService;

    // 매일 0시 0분 0초에 실행
    @Scheduled(cron = "0 0 0 * * *")
//    @Scheduled(fixedDelay = 1000 * 60 * 60)
    public void scheduleRestaurant() {

        // 오류 발생 전까지 saveAllRestaurant page 0부터 1씩 증가하며 실행
        for (long i = 0; i < 51; i++) {
            restaurantService.saveAllRestaurant(i);
        }

    }

    @Scheduled(fixedDelay = 1000 * 60 * 60)
    public void scheduleDistrict() {
        for (int i = 0 ; i < DistrictEnum.values().length; i++) {
            districtService.saveDistrict(DistrictEnum.values()[i]);
        }
    }

}