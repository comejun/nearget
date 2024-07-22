package com.nearget.back.controller;

import com.nearget.back.dto.DistrictDTO;
import com.nearget.back.dto.MapDataDTO;
import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.service.DistrictService;
import com.nearget.back.service.RestaurantDataService;
import com.nearget.back.service.RestaurantService;
import com.nearget.back.service.SmallDistrictService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/map")
@RequiredArgsConstructor
@Slf4j
public class MapController {

    private final RestaurantService restaurantService;
    private final RestaurantDataService restaurantDataService;
    private final DistrictService districtService;
    private final SmallDistrictService smallDistrictService;

    @PostMapping("/mapdata")
    public List<Object> getMarkersData(@RequestBody MapDataDTO mapDataDTO){

        List<Object> objectList = new ArrayList<>();

        // mapDataDTO.getLevel() 값이 7또는 8일경우 실행될 함수
        if(mapDataDTO.getLevel() == 7 || mapDataDTO.getLevel() == 8){
            List<DistrictDTO> districtDTOList = districtService.countRestaurantsByCategory(mapDataDTO.getCategory());
            // districtDTOList를 List<Object>로 변환
            for(DistrictDTO districtDTO : districtDTOList){
                objectList.add(districtDTO);
            }
        }

        // mapDataDTO.getLevel() 값이 5또는 6일경우 실행될 함수
        if(mapDataDTO.getLevel() == 5 || mapDataDTO.getLevel() == 6){
            List<DistrictDTO> districtDTOList = smallDistrictService.countRestaurantsByCategory(mapDataDTO.getCategory(),mapDataDTO.getBounds());
            // districtDTOList를 List<Object>로 변환
            for(DistrictDTO districtDTO : districtDTOList){
                objectList.add(districtDTO);
            }
        }

        if(mapDataDTO.getLevel() <=4){
            List<RestaurantDTO> restaurantDTOList = restaurantDataService.getRestaurantsByCategoryAndBounds(mapDataDTO.getCategory(),mapDataDTO.getBounds());
            // restaurantDTOList를 List<Object>로 변환
            for(RestaurantDTO restaurantDTO : restaurantDTOList){
                objectList.add(restaurantDTO);
            }
        }
        return objectList;
    }
}

