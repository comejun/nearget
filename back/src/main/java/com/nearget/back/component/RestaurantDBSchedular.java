package com.nearget.back.component;

import com.google.gson.Gson;
import com.nearget.back.domain.Restaurant;
import com.nearget.back.repository.RestaurantsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RestaurantDBSchedular {

    static Long num = 1L;
    static Long page = 0L;
    private final RestaurantsRepository restaurantsRepository;

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


    @Scheduled(fixedDelay = 1000)
    public void scheduleRestaurant() {
        WebClient client = createWebClient()
                .mutate()
                .baseUrl("http://openapi.seoul.go.kr:8088/7050644859636f6d37316173754544/json/LOCALDATA_072404")
                .build();

        List<Restaurant> restaurants = new ArrayList<>();
        long forPage = page + 5;
        for (; page < forPage; page++) {
            client.get()
                    .uri("/{start}/{end}", num, num + 499)
                    .retrieve()
                    .bodyToMono(String.class)
                    .subscribe(body -> {
                        Gson gson = new Gson();
                        LocalData localData = gson.fromJson(body, LocalData.class);

                        for (BusinessInfo businessInfo : localData.LOCALDATA_072404.row) {
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
                    });
        }

        restaurantsRepository.saveAll(restaurants);


        num += 500;
    }

    static class LocalData {
        LocalData_072404 LOCALDATA_072404;
    }

    static class LocalData_072404 {
        List<BusinessInfo> row;
    }

    static class BusinessInfo {
        String BPLCNM;
        String SITEWHLADDR;
        String TRDSTATEGBN;
        String UPTAENM;
        String MGTNO;
    }
}