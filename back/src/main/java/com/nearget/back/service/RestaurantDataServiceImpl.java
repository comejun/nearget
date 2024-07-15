package com.nearget.back.service;

import com.nearget.back.domain.RestaurantsData;
import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.dto.RestaurantMenuDto;
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


    @Override
    public RestaurantDTO getRestaurant(Long restaurantId) {

        // 음식점 조회
        RestaurantDTO restaurantDTO = restaurantsDataRepository.findById(restaurantId).orElse(null).toDTO();
        log.info("restaurantDTO : {}", restaurantDTO);

        if (restaurantDTO.getImage().isEmpty() || restaurantDTO.getImage().equals("")){
           restaurantDTO =  getRestaurantDataFromWeb(restaurantDTO);
           restaurantsDataRepository.save(restaurantDTO.toRestaurantsDataEntity());
        }

        log.info(" ************* restaurantDTO : {}", restaurantDTO);

        return restaurantDTO;
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
            restaurantDTO.changeName(restaurantName);

            Element imgElement = element.select("#_autoPlayable > img").first();
            String imgSrc = imgElement.attr("src");
            restaurantDTO.changeImage(imgSrc);

            Element menuElement = element.select("div.place_section_content > ul").first();
            Elements liElements = menuElement.select("li");
            List<RestaurantMenuDto> menuList = new ArrayList<>();
            for (Element menuItem : liElements) {
                String itemName = menuItem.select("span").text();
                if (itemName.equals("")) {
                    itemName = menuItem.select("a").text();
                }
                String itemPrice = menuItem.select("em").text();
                // itemPrice에서 숫자 외의 문자 제거
                itemPrice = itemPrice.replaceAll("[^0-9]", "");
                int price = Integer.parseInt(itemPrice);

                RestaurantMenuDto restaurantMenuDto = new RestaurantMenuDto(itemName, price);
                menuList.add(restaurantMenuDto);
            }

            restaurantDTO.changeMenuList(menuList);


            String phoneElement = element.select("div.place_section_content > div > div.O8qbU.nbXkr > div > span").first().text();
            restaurantDTO.changePhone(phoneElement);


        } catch (IOException e) {
            e.printStackTrace();
        }
        return restaurantDTO; // 수정된 RestaurantDTO 객체를 반환
    }

}
