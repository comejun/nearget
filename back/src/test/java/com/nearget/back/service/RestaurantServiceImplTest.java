package com.nearget.back.service;

import com.google.gson.Gson;
import com.nearget.back.domain.Restaurant;
import com.nearget.back.repository.RestaurantsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestaurantServiceImplTest {

    @Autowired
    private RestaurantsRepository restaurantsRepository;

    @Test
    @Rollback(value = false)
    void saveAllRestaurant() {

        CountDownLatch latch = new CountDownLatch(1);

        WebClient client = createWebClient()
                .mutate()
                .baseUrl("http://openapi.seoul.go.kr:8088/7050644859636f6d37316173754544/json/LOCALDATA_072404")
                .build();

        // bulk insert 위한 배열 생성
        List<Restaurant> restaurants = new ArrayList<>();

        client.get()
                .uri("/{start}/{end}", 1, 100)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe(body -> {
                    Gson gson = new Gson();
                    RestaurantServiceImpl.LocalData localData = gson.fromJson(body, RestaurantServiceImpl.LocalData.class);

                    for (RestaurantServiceImpl.BusinessInfo businessInfo : localData.LOCALDATA_072404.row) {
                        if (!businessInfo.TRDSTATEGBN.equals("03") && !businessInfo.UPTAENM.equals("기타")) {
                            Restaurant restaurant = Restaurant.builder()
                                    .id(Long.parseLong(businessInfo.MGTNO.replaceAll("[^0-9]", "")))
                                    .name(businessInfo.BPLCNM)
                                    .address(businessInfo.SITEWHLADDR)
                                    .category(businessInfo.UPTAENM)
                                    // lat, lng 등 필요한 필드 추가 설정
                                    .build();
                            restaurants.add(restaurant);
                        }
                    }
                    restaurantsRepository.saveAll(restaurants);
                    latch.countDown();

                });

    }

    // WebClient 설정 및 생성
    public WebClient createWebClient() {
        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(128 * 1024 * 1024))
                .build();

        return WebClient.builder()
                .exchangeStrategies(exchangeStrategies)
                .build();
    }

    // JSON 데이터를 파싱하기 위한 클래스
    static class LocalData {
        RestaurantServiceImpl.LocalData_072404 LOCALDATA_072404;
    }

    // JSON 데이터를 파싱하기 위한 클래스
    static class LocalData_072404 {
        List<RestaurantServiceImpl.BusinessInfo> row;
    }

    //  JSON 데이터를 파싱하기 위한 클래스
    static class BusinessInfo {
        String BPLCNM;
        String SITEWHLADDR;
        String TRDSTATEGBN;
        String UPTAENM;
        String MGTNO;
    }
}
