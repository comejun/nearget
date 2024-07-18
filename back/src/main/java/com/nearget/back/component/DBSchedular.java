package com.nearget.back.component;

import com.nearget.back.domain.*;
import com.nearget.back.repository.RestaurantsDataRepository;
import com.nearget.back.repository.RestaurantsRepository;
import com.nearget.back.service.DistrictService;
import com.nearget.back.service.RestaurantService;
import com.nearget.back.service.SmallDistrictService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.concurrent.CompletableFuture;
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
        Thread.sleep(1000 * 60 * 10);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
        saveRestaurantsDataOptimized();
        scheduleDistrict();
    }
    public void scheduleDistrict() {
        for (int i = 0; i < DistrictEnum.values().length; i++) {
            districtService.saveDistrict(DistrictEnum.values()[i]);
        }
        for (int i = 0; i < SmallDistrictEnum.values().length; i++) {
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
                                .restaurantAddress(restaurant.getAddress())
                                .category(restaurant.getCategory())
                                .lat(restaurant.getLat())
                                .lng(restaurant.getLng())
                                .build())).collect(Collectors.toList())
        ).join();

        restaurantsDataRepository.saveAll(restaurantsData);
    }


/*
    // RestaurantsData에 RestaurantImage가 비어있는 경우 RestaurantImage를 추가하는 함수
    @Scheduled(fixedDelay = 1000 * 60 * 60)
    public void addRestaurantImage() {
        int pageSize = 50; // 적절한 페이지 크기 설정
        int page = 0;
        Pageable pageable = PageRequest.of(page, pageSize);
        List<RestaurantsData> pageData;


        do {
            pageData = restaurantsDataRepository.findAll(pageable).getContent();
            List<CompletableFuture<Void>> futures = pageData.stream()
                    .filter(restaurantData -> restaurantData.getRestaurantImage() == null || restaurantData.getRestaurantImage().isEmpty())
                    .map(restaurantData -> CompletableFuture.supplyAsync(() -> {
                        try {
                            // 랜덤 딜레이 추가
                            int delay = (int) (Math.random() * 1000);
                            Thread.sleep(delay); // 요청 간격 조절
                            return getRestaurantImageAsync(restaurantData.getRestaurantAddress().split(" ")[2] + " " + restaurantData.getRestaurantName()).join();
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                            return null;
                        }
                    }).thenAccept(restaurantImage -> {
                        synchronized (restaurantData) {
                            restaurantData.changeRestaurantImage(restaurantImage);
                        }
                    }))
                    .collect(Collectors.toList());

            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
            restaurantsDataRepository.saveAll(pageData);
            pageable = pageable.next();
        } while (!pageData.isEmpty());
    }*/


   /* // Jsoup을 이용하여 식당 이미지를 크롤링하여 반환하는 함수
    public CompletableFuture<String> getRestaurantImageAsync(String searchText) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String url = "https://m.search.naver.com/search.naver?sm=mtb_sly.hst&where=m&ssc=tab.m.all&oquery=&tqi=ipfL%2FdqVbxVss55cmVossssstjG-030495&query=" + searchText;
                log.info(searchText);
                Document doc = Jsoup.connect(url)
                        .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")
                        .referrer("http://www.google.com")
                        .get();
                // Assuming the image URL is in an <img> tag within a specific class or ID

                Elements elements = doc.select("#_autoPlayable > img");
                if (!elements.isEmpty()) {
                    return elements.get(0).attr("src");
                } else {
                    return "없음";
                }
            } catch (Exception e) {
                e.printStackTrace();
                return "오류";
            }
        });
    }*/


    /*@Scheduled(fixedDelay = 1000 * 60 * 60)
    public void IpBlockCheck() {
        // Method to check website access

            String url = "https://m.search.naver.com/search.naver?sm=mtb_sly.hst&where=m&ssc=tab.m.all&oquery=&tqi=ipfL%2FdqVbxVss55cmVossssstjG-030495&query=연지동 연지돈"; // 확인하고자 하는 웹 사이트 URL
            try {
                Document doc = Jsoup.connect(url)
                        .userAgent("Mozilla/5.0") // User-Agent 변경하여 시도
                        .get();
                System.out.println("성공적으로 웹 페이지를 가져왔습니다. 상태 코드: 200");
                log.info(doc.toString());
                // 응답 내용 분석 로직 추가 가능
            } catch (Exception e) {
                System.out.println("웹 페이지를 가져오는 데 실패했습니다. 오류 메시지: " + e.getMessage());
                // 여기서 HTTP 상태 코드에 따라 다른 처리를 할 수 있습니다.
                // 예: if (e.getMessage().contains("Status=403")) { ... }
            }

    }*/

}