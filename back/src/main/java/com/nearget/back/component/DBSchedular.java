package com.nearget.back.component;

import com.nearget.back.domain.DistrictEnum;
import com.nearget.back.domain.Restaurant;
import com.nearget.back.domain.RestaurantsData;
import com.nearget.back.domain.SmallDistrictEnum;
import com.nearget.back.repository.RestaurantsDataRepository;
import com.nearget.back.repository.RestaurantsRepository;
import com.nearget.back.service.DistrictService;
import com.nearget.back.service.RestaurantService;
import com.nearget.back.service.SmallDistrictService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.concurrent.ForkJoinPool;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class DBSchedular {

    private final RestaurantService restaurantService;
    private final DistrictService districtService;
    private final SmallDistrictService smallDistrictService;
    private final RestaurantsRepository restaurantsRepository;
    private final RestaurantsDataRepository restaurantsDataRepository;

    @PersistenceContext
    private EntityManager entityManager;

    private ForkJoinPool customThreadPool = new ForkJoinPool(10); // 클래스 레벨로 이동


    // 매일 0시 0분 0초에 실행
//    @Scheduled(cron = "0 0 0 * * *")
    @Scheduled(fixedDelay = 1000 * 60 * 60)
    public void scheduleRestaurant() {

        // 오류 발생 전까지 saveAllRestaurant page 0부터 1씩 증가하며 실행
        for (long i = 0; i < 51; i++) {
            restaurantService.saveAllRestaurant(i);
        }

        // 2분 뒤에 실행
        try {
            Thread.sleep(1000 * 60 * 2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        saveRestaurantsDataOptimized();
        scheduleDistrict();
    }

    // 매일 0시 5분 0초에 실행
//    @Scheduled(cron = "0 5 0 * * *")
    public void scheduleDistrict() {
        for (int i = 0 ; i < DistrictEnum.values().length; i++) {
            districtService.saveDistrict(DistrictEnum.values()[i]);
        }
        for (int i =0; i < SmallDistrictEnum.values().length; i++) {
            smallDistrictService.saveSmallDistrict(SmallDistrictEnum.values()[i]);
        }
    }


    public void saveRestaurantsDataOptimized() {
        int pageSize = 3000; // 성능 테스트를 통해 최적의 페이지 크기를 찾아 조정
        int page = 0;
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        List<Restaurant> restaurants;

        do {
            restaurants = restaurantsRepository.findAll(pageRequest).getContent();
            processAndSaveRestaurantsPage(restaurants);
            pageRequest = pageRequest.next();
        } while (!restaurants.isEmpty());
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW) // 각 페이지 처리마다 별도의 트랜잭션 시작
    public void processAndSaveRestaurantsPage(List<Restaurant> restaurants) {
        List<RestaurantsData> restaurantsData = customThreadPool.submit(() ->
                restaurants.parallelStream().map(restaurant ->
                        restaurantsDataRepository.findById(restaurant.getId()).orElse(RestaurantsData.builder()
                                .id(restaurant.getId())
                                .restaurantName(restaurant.getName())
                                .build())).collect(Collectors.toList())
        ).join();

        restaurantsDataRepository.saveAll(restaurantsData);
    }



}