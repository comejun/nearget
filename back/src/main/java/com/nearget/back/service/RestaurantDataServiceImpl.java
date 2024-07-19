package com.nearget.back.service;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.RestaurantsData;
import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.dto.RestaurantMenuDto;
import com.nearget.back.repository.MemberRepository;
import com.nearget.back.repository.RestaurantsDataRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
@Transactional
public class RestaurantDataServiceImpl implements RestaurantDataService {

    private final RestaurantsDataRepository restaurantsDataRepository;
    private final MemberRepository memberRepository;


    @Override
    public RestaurantDTO getRestaurant(Long restaurantId) {

        // 음식점 조회
        RestaurantDTO restaurantDTO = restaurantsDataRepository.findById(restaurantId).orElse(null).toDTO();
        log.info("restaurantDTO : {}", restaurantDTO);

        if (restaurantDTO.getImage().isEmpty() || restaurantDTO.getImage().equals("")){
           restaurantDTO =  getRestaurantDataFromWeb(restaurantDTO);
           log.info("restaurantDTO : {}", restaurantDTO);
           restaurantsDataRepository.save(restaurantDTO.toRestaurantsDataEntity());
        }
        int likeCount = memberRepository.countByRestaurantId(restaurantDTO.getId());
        restaurantDTO.changeLikeCount(likeCount);

        log.info(" ************* restaurantDTO : {}", restaurantDTO);

        return restaurantDTO;
    }

    @Override
    public List<RestaurantDTO> getTodayRestaurants(Double lat, Double lng, String category) {


        // lat lng을 기준으로 1km 좌표값 계산
        Double lat1 = lat - 0.009;
        Double lat2 = lat + 0.009;
        Double lng1 = lng - 0.009;
        Double lng2 = lng + 0.009;

        List<RestaurantsData>restaurantsDataList = new ArrayList<>();

        if(category.equals("ALL")){
            // 오늘의 음식점 전체 조회
            restaurantsDataList = restaurantsDataRepository.findTop5ByLatBetweenAndLngBetween(lat1, lat2, lng1, lng2);
        }
        else{
            Category category1= Category.FASTFOOD;
            log.info("category1 : {}", category1);
            restaurantsDataList = restaurantsDataRepository.findTop5ByLatBetweenAndLngBetweenAndCategory(lat1, lat2, lng1, lng2, category);

        }

        // restaurantsDataList를 List<RestaurantDTO>로 변환
        List<RestaurantDTO> restaurantDTOList = new ArrayList<>();
        for (RestaurantsData restaurantsData : restaurantsDataList) {
            RestaurantDTO restaurantDTO = restaurantsData.toDTO();
            // 현위치 기준으로 음식점까지의 거리를 M단위로 변환 후 RestaurantDTO 객체에 저장
            double distance = calculateDistanceInMeters(lat, lng, restaurantDTO.getLat(), restaurantDTO.getLng());
            // member_like_restaurant_list 테이블에서 해당 음식점의 좋아요 개수 조회
            int likeCount = memberRepository.countByRestaurantId(restaurantDTO.getId());
            restaurantDTO.changeLikeCount(likeCount);
            restaurantDTO.changeDistance(distance);
            restaurantDTOList.add(restaurantDTO);
        }
        return restaurantDTOList;
    }

    @Override
    public List<RestaurantDTO> getPriceRestaurants(Double lat, Double lng, String category) {

        // lat lng을 기준으로 2km 좌표값 계산
        Double lat1 = lat - 0.018;
        Double lat2 = lat + 0.018;
        Double lng1 = lng - 0.018;
        Double lng2 = lng + 0.018;

        // 가격순 음식점 조회
        List<RestaurantsData> restaurantsDataList = new ArrayList<>();

        if(category.equals("ALL")){
            // 가격별 음식점 전체 조회
            restaurantsDataList = restaurantsDataRepository.findByLatBetweenAndLngBetweenOrderByMenu(lat1, lat2, lng1, lng2);
        }
        else{
            restaurantsDataList = restaurantsDataRepository.findByLatBetweenAndLngBetweenAndCategoryOrderByMenu(lat1, lat2, lng1, lng2, category);
            // menulist가 1개 이상인 음식점만 필터링
            restaurantsDataList.removeIf(restaurantsData -> restaurantsData.getMenuList().size() < 1);
        }

        // restaurantsDataList를 List<RestaurantDTO>로 변환
        List<RestaurantDTO> restaurantDTOList = new ArrayList<>();
        for (RestaurantsData restaurantsData : restaurantsDataList) {
            RestaurantDTO restaurantDTO = restaurantsData.toDTO();
            // 현위치 기준으로 음식점까지의 거리를 M단위로 변환 후 RestaurantDTO 객체에 저장
            double distance = calculateDistanceInMeters(lat, lng, restaurantDTO.getLat(), restaurantDTO.getLng());
            // member_like_restaurant_list 테이블에서 해당 음식점의 좋아요 개수 조회
            int likeCount = memberRepository.countByRestaurantId(restaurantDTO.getId());

            // menuList의 가격 평균값을 구한 후 RestaurantDTO 객체에 저장
            Double menuPriceSum = 0.0;
            for (RestaurantMenuDto restaurantMenuDto : restaurantDTO.getMenuList()) {
                menuPriceSum += restaurantMenuDto.getPrice();
            }
            restaurantDTO.changeAvgPrice(menuPriceSum / restaurantDTO.getMenuList().size());
            log.info("************ RestaurantDataServiceImpl - getPriceRestaurants - 이름 : {} menuPriceAvg : {}", restaurantDTO.getName(),restaurantDTO.getAvgPrice());
            restaurantDTO.changeLikeCount(likeCount);
            restaurantDTO.changeDistance(distance);
            restaurantDTOList.add(restaurantDTO);
        }
        // 가격 낮은순으로 정렬
        restaurantDTOList.sort((o1, o2) -> o1.getAvgPrice().compareTo(o2.getAvgPrice()));
        // 10개까지만 반환
        if (restaurantDTOList.size() > 10) {
            return restaurantDTOList.subList(0, 10);
        }
        return restaurantDTOList;
    }

    @Override
    public List<RestaurantDTO> getDistanceRestaurants(Double lat, Double lng, String category) {

            // lat lng을 기준으로 2km 좌표값 계산
            Double lat1 = lat - 0.018;
            Double lat2 = lat + 0.018;
            Double lng1 = lng - 0.018;
            Double lng2 = lng + 0.018;

            // 거리순 음식점 조회
            List<RestaurantsData> restaurantsDataList = new ArrayList<>();

            if(category.equals("ALL")){
                // 거리순 음식점 전체 조회
                restaurantsDataList = restaurantsDataRepository.findByLatBetweenAndLngBetween(lat1, lat2, lng1, lng2);
            }
            else{
                restaurantsDataList = restaurantsDataRepository.findByLatBetweenAndLngBetweenAndCategoryOrderByMenu(lat1, lat2, lng1, lng2, category);
            }

            // restaurantsDataList를 List<RestaurantDTO>로 변환
            List<RestaurantDTO> restaurantDTOList = new ArrayList<>();
            for (RestaurantsData restaurantsData : restaurantsDataList) {
                RestaurantDTO restaurantDTO = restaurantsData.toDTO();
                // 현위치 기준으로 음식점까지의 거리를 M단위로 변환 후 RestaurantDTO 객체에 저장
                double distance = calculateDistanceInMeters(lat, lng, restaurantDTO.getLat(), restaurantDTO.getLng());
                // member_like_restaurant_list 테이블에서 해당 음식점의 좋아요 개수 조회
                int likeCount = memberRepository.countByRestaurantId(restaurantDTO.getId());
                restaurantDTO.changeLikeCount(likeCount);
                restaurantDTO.changeDistance(distance);
                restaurantDTOList.add(restaurantDTO);
            }
            // 거리 가까운순으로 정렬
            restaurantDTOList.sort((o1, o2) -> o1.getDistance().compareTo(o2.getDistance()));
            // 50개까지만 반환
            if (restaurantDTOList.size() > 50) {
                return restaurantDTOList.subList(0, 50);
            }
            return restaurantDTOList;

    }

    public static double calculateDistanceInMeters(double lat1, double lng1, double lat2, double lng2) {
        final int R = 6371000; // 지구의 반지름(m)
        double latDistance = Math.toRadians(lat2 - lat1);
        double lngDistance = Math.toRadians(lng2 - lng1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c; // 결과 거리(m)

        return distance;
    }

    public RestaurantDTO getRestaurantDataFromWeb(RestaurantDTO restaurantDTO) {

        String searchText = restaurantDTO.getAddress().split(" ")[2] + " " + restaurantDTO.getName();

        String url = "https://m.search.naver.com/search.naver?sm=mtb_sly.hst&where=m&ssc=tab.m.all&oquery=&tqi=ipfL%2FdqVbxVss55cmVossssstjG-030495&query=" + searchText;
        log.info(searchText);
        try {
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")
                    .referrer("http://www.google.com")
                    .get();

            Element element = doc.select("#place-main-section-root").first();
            if(element == null) {
                log.info("element is null");
                restaurantDTO.changeImage("없음");
                return restaurantDTO;
            }
            String restaurantName = element.select("#_title > a > span.GHAhO").text();
            if(!restaurantName.equals("") || !restaurantName.isEmpty()){
                restaurantDTO.changeName(restaurantName);
            }

            if(element.select(("#_autoPlayable > img")).first() == null){
                restaurantDTO.changeImage("없음");
            }
            else {

                Element imgElement = element.select("#_autoPlayable > img").first();
                String imgSrc = imgElement.attr("src");
                restaurantDTO.changeImage(imgSrc);
            }

           /* Elements menu = element.select("div.place_section_content");
            log.info("menu : {}", menu);
            Elements menuElement = menu.select("ul");
*/
            List<RestaurantMenuDto> menuList = null;

            try {
//            jnwQZ t1osG Jp8E6
                Element menuElement = element.select("ul.jnwQZ, ul.t1osG, ul.Jp8E6.a0hWz").first();

                log.info("menuElement : {}", menuElement);
                Elements liElements = menuElement.select("li");
                menuList = new ArrayList<>();
                for (Element menuItem : liElements) {
                    log.info("menuItem : {}", menuItem);
                    // li 태그 안에 place_bluelink 클래스 가지고 있는 a태그 선택
                    String itemName = menuItem.select( "span").text();
                    if (itemName.equals("") || itemName.isEmpty() || itemName.equals("사진")){
                        itemName = menuItem.select("a.place_bluelink").first().text();
                    }
                    String itemPrice = menuItem.select("em").text();
                    // itemPrice에서 숫자 외의 문자 제거
                    itemPrice = itemPrice.replaceAll("[^0-9]", "");
                    int price = Integer.parseInt(itemPrice);

                    RestaurantMenuDto restaurantMenuDto = new RestaurantMenuDto(itemName, price);
                    menuList.add(restaurantMenuDto);
                    restaurantDTO.changeMenuList(menuList);

                }
            } catch (Exception e) {
                log.info("menu is null");
            }



            if (element.select("div.place_section_content > div > div.O8qbU.nbXkr > div > span").first() == null){
                restaurantDTO.changePhone("");
            }
            else{
                String phoneElement = element.select("div.place_section_content > div > div.O8qbU.nbXkr > div > span").first().text();
                restaurantDTO.changePhone(phoneElement);
            }



        } catch (IOException e) {
            e.printStackTrace();
        }
        return restaurantDTO; // 수정된 RestaurantDTO 객체를 반환
    }

}
