package com.nearget.back.service;

import com.google.gson.Gson;
import com.nearget.back.domain.Category;
import com.nearget.back.domain.Restaurant;
import com.nearget.back.repository.RestaurantsRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.proj4j.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
@Transactional
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantsRepository restaurantsRepository;

    @Override
    public void saveAllRestaurant(Long page) {

        WebClient client = createWebClient()
                .mutate()
                .baseUrl("http://openapi.seoul.go.kr:8088/7050644859636f6d37316173754544/json/LOCALDATA_072404")
                .build();
        List<Mono<List<Restaurant>>> restaurantMonos = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            int finalI = i;
            Mono<List<Restaurant>> restaurantMono = client.get()
                    .uri("/{start}/{end}", page * 10000 + i * 1000 + 1, page * 10000 + (i + 1) * 1000)
                    .retrieve()
                    .bodyToMono(String.class)
                    .map(body -> {
                        Gson gson = new Gson();
                        LocalData localData = gson.fromJson(body, LocalData.class);
                        List<Restaurant> restaurants = new ArrayList<>();

                        if (localData != null && localData.LOCALDATA_072404 != null) {
                            for (BusinessInfo businessInfo : localData.LOCALDATA_072404.row) {
                                if (!businessInfo.TRDSTATEGBN.equals("03") && !businessInfo.UPTAENM.equals("기타")) {

                                    if (businessInfo.UPTAENM.equals("경양식") || businessInfo.UPTAENM.equals("까페") || businessInfo.UPTAENM.equals("분식")
                                            || businessInfo.UPTAENM.equals("일식") || businessInfo.UPTAENM.equals("호프/통닭") || businessInfo.UPTAENM.equals("중국식")
                                            || businessInfo.UPTAENM.equals("패스트푸트") || businessInfo.UPTAENM.equals("한식")) {

                                        Category category = Category.KOREAN;
                                        if (businessInfo.UPTAENM.equals("경양식")) {
                                            category = Category.WESTERN;
                                        } else if (businessInfo.UPTAENM.equals("까페")) {
                                            category = Category.CAFE;
                                        } else if (businessInfo.UPTAENM.equals("분식")) {
                                            category = Category.STREET;
                                        } else if (businessInfo.UPTAENM.equals("일식")) {
                                            category = Category.JAPANESE;
                                        } else if (businessInfo.UPTAENM.equals("호프/통닭")) {
                                            category = Category.PUB;
                                        } else if (businessInfo.UPTAENM.equals("중국식")) {
                                            category = Category.CHINESE;
                                        } else if (businessInfo.UPTAENM.equals("패스트푸트")) {
                                            category = Category.FASTFOOD;
                                        } else if (businessInfo.UPTAENM.equals("한식")) {
                                            category = Category.KOREAN;
                                        }

// CRS 객체 생성
                                        CRSFactory crsFactory = new CRSFactory();

                                        // WGS84 system 정의
                                        String wgs84Name = "WGS84";
                                        String wgs84Proj = "+proj=longlat +datum=WGS84 +no_defs";
                                        CoordinateReferenceSystem wgs84System = crsFactory.createFromParameters(wgs84Name, wgs84Proj);

                                        // EPSG:2097 system 정의
                                        String epsgName = "EPSG:2097";
                                        String epsgProj = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
                                        CoordinateReferenceSystem epsgSystem = crsFactory.createFromParameters(epsgName, epsgProj);

                                        // 변환할 좌표계 정보 생성
                                        ProjCoordinate p = new ProjCoordinate();
                                        p.x = parseDoubleOrDefault(businessInfo.X, 0); // 경도 (x)
                                        p.y = parseDoubleOrDefault(businessInfo.Y, 0); // 위도 (y)

                                        // 변환된 좌표를 담을 객체 생성
                                        ProjCoordinate p2 = new ProjCoordinate();

                                        CoordinateTransformFactory ctFactory = new CoordinateTransformFactory();
                                        // 변환 시스템 지정. (원본 시스템, 변환 시스템)
                                        CoordinateTransform coordinateTransform = ctFactory.createTransform(epsgSystem, wgs84System);
                                        // 좌표 변환
                                        ProjCoordinate projCoordinate = coordinateTransform.transform(p, p2);

                                        // 변환된 좌표
                                        double wgsLng = projCoordinate.x;
                                        double wgsLat = projCoordinate.y;



                                        Restaurant restaurant = Restaurant.builder()
                                                .id(Long.parseLong(businessInfo.MGTNO.replaceAll("[^0-9]", "")))
                                                .name(businessInfo.BPLCNM)
                                                .address(businessInfo.SITEWHLADDR)
                                                .category(category)
                                                .lng(wgsLng)
                                                .lat(wgsLat)
                                                .build();
                                        restaurants.add(restaurant);
                                    }


                                }
                            }
                        } else {
                            log.error("LOCALDATA_072404 is null or not initialized properly page: {}, i: {}", page, finalI);
                        }

                        return restaurants;
                    });
            restaurantMonos.add(restaurantMono);
        }

        Flux.concat(restaurantMonos)
                .flatMap(Flux::fromIterable)
                .collectList()
                .doOnNext(restaurants -> log.info("Saving restaurants to the database, count: {}", restaurants.size()))
                .flatMap(restaurants -> Mono.fromCallable(() -> restaurantsRepository.saveAll(restaurants)))
                .subscribe();

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
        LocalData_072404 LOCALDATA_072404;
    }

    // JSON 데이터를 파싱하기 위한 클래스
    static class LocalData_072404 {
        List<BusinessInfo> row;
    }

    //  JSON 데이터를 파싱하기 위한 클래스
    static class BusinessInfo {
        String BPLCNM;
        String SITEWHLADDR;
        String TRDSTATEGBN;
        String UPTAENM;
        String MGTNO;
        String X;
        String Y;
    }

    public static double parseDoubleOrDefault(String str, double defaultValue) {
        try {
            return Double.parseDouble(str);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }
}


