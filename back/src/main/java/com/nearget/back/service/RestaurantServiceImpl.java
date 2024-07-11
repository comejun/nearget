package com.nearget.back.service;

import com.google.gson.Gson;
import com.nearget.back.domain.Category;
import com.nearget.back.domain.DistrictCountResult;
import com.nearget.back.domain.Restaurant;
import com.nearget.back.domain.SmallDistrictEnum;
import com.nearget.back.dto.DistrictDTO;
import com.nearget.back.dto.RestaurantDTO;
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
import java.util.LinkedHashMap;
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
                                if (!businessInfo.TRDSTATEGBN.equals("03") && !businessInfo.UPTAENM.equals("기타") && !businessInfo.SITEWHLADDR.isEmpty()){

                                    if (businessInfo.UPTAENM.equals("경양식") || businessInfo.UPTAENM.equals("까페") || businessInfo.UPTAENM.equals("분식") || businessInfo.UPTAENM.equals("일식") || businessInfo.UPTAENM.equals("호프/통닭") || businessInfo.UPTAENM.equals("중국식") || businessInfo.UPTAENM.equals("패스트푸드") || businessInfo.UPTAENM.equals("한식")) {

                                        Restaurant restaurant = getRestaurant(businessInfo);
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

    // BusinessInfo 객체의 좌표를  변환
    private ProjCoordinate getProjCoordinate(BusinessInfo businessInfo) {
        CRSFactory crsFactory = new CRSFactory();
        CoordinateReferenceSystem wgs84System = crsFactory.createFromParameters("WGS84", "+proj=longlat +datum=WGS84 +no_defs");
        CoordinateReferenceSystem epsgSystem = crsFactory.createFromParameters("EPSG:5174", "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43");
        ProjCoordinate p = new ProjCoordinate(parseDoubleOrDefault(businessInfo.X, 0), parseDoubleOrDefault(businessInfo.Y, 0));
        ProjCoordinate p2 = new ProjCoordinate();
        new CoordinateTransformFactory().createTransform(epsgSystem, wgs84System).transform(p, p2);
        return p2;
    }

    // BusinessInfo 객체를 Restaurant 객체로 변환
    private Restaurant getRestaurant(BusinessInfo businessInfo) {
        ProjCoordinate projCoordinate = getProjCoordinate(businessInfo);
        Category category = getCategory(businessInfo.UPTAENM);
        return Restaurant.builder()
                .id(Long.parseLong(businessInfo.MGTNO.replaceAll("[^0-9]", "")))
                .name(businessInfo.BPLCNM)
                .address(businessInfo.SITEWHLADDR)
                .category(category)
                .lng(projCoordinate.x)
                .lat(projCoordinate.y)
                .build();
    }

    @Override
    public List<RestaurantDTO> getRestaurantsByCategoryAndBounds(String category, Object bounds) {

        // bounds의 안의 데이터 추출
        Gson gson = new Gson();
        LinkedHashMap<String, Object> map = new LinkedHashMap<>();
        // If obj is a String that represents a JSON
        if (bounds instanceof String) {
            log.info("1번");
            map = gson.fromJson((String) bounds, LinkedHashMap.class);
        }
        else {
            // If obj is not a String but needs to be treated as a JSON-like structure
            log.info("2번");
            String json = gson.toJson(bounds);
            map = gson.fromJson(json, LinkedHashMap.class);
        }

        log.info("map : {}", map);
        double swLng = (double) map.get("ha");
        double swLat = (double) map.get("qa");
        double neLng = (double) map.get("oa");
        double neLat = (double) map.get("pa");

        log.info("swLng : {}", swLng);
        log.info("swLat : {}", swLat);
        log.info("neLng : {}", neLng);
        log.info("neLat : {}", neLat);

        log.info("************ DistrictServiceImpl - countRestaurantsByCategory -category : {}", category);

        List<RestaurantDTO> restaurantDTOList = new ArrayList<>();

        if (category.equals("ALL")) {

            List<Restaurant> restaurantList = restaurantsRepository.findByLngBetweenAndLatBetween(swLng, neLng, swLat, neLat);
            // restaurantList를 List<RestaurantDTO>로 변환
            for (Restaurant restaurant : restaurantList) {
                RestaurantDTO restaurantDTO = RestaurantDTO.builder()
                        .id(restaurant.getId())
                        .name(restaurant.getName())
                        .address(restaurant.getAddress())
                        .category(restaurant.getCategory().getValue())
                        .lat(restaurant.getLat())
                        .lng(restaurant.getLng())
                        .build();
                restaurantDTOList.add(restaurantDTO);
            }

            return restaurantDTOList;


        }

        Category categoryEntity = Category.of(category);

        List<Restaurant> restaurantList = restaurantsRepository.findByLngBetweenAndLatBetweenAndCategory(swLng, neLng, swLat, neLat, categoryEntity);
        // restaurantList를 List<RestaurantDTO>로 변환
        for (Restaurant restaurant : restaurantList) {
            RestaurantDTO restaurantDTO = RestaurantDTO.builder()
                    .id(restaurant.getId())
                    .name(restaurant.getName())
                    .address(restaurant.getAddress())
                    .category(restaurant.getCategory().getValue())
                    .lat(restaurant.getLat())
                    .lng(restaurant.getLng())
                    .build();
            restaurantDTOList.add(restaurantDTO);
        }

        return restaurantDTOList;
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

    // BusinessInfo 객체의 업태명을 Category로 변환
    private Category getCategory(String businessType) {
        return switch (businessType) {
            case "경양식" -> Category.WESTERN;
            case "까페" -> Category.CAFE;
            case "분식" -> Category.STREET;
            case "��식" -> Category.JAPANESE;
            case "호프/통닭" -> Category.PUB;
            case "중국식" -> Category.CHINESE;
            case "패스트푸트" -> Category.FASTFOOD;
            default -> Category.KOREAN;
        };
    }

    // 문자열을 double로 변환하는 메서드
    public static double parseDoubleOrDefault(String str, double defaultValue) {
        try {
            return Double.parseDouble(str);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    // ***** JSON 데이터를 파싱하기 위한 클래스 *****
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
        String X;
        String Y;
    }

}


