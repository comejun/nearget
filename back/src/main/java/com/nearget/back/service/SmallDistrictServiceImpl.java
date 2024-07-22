package com.nearget.back.service;

import com.google.gson.Gson;
import com.nearget.back.domain.*;
import com.nearget.back.dto.DistrictDTO;
import com.nearget.back.repository.RestaurantsDataRepository;
import com.nearget.back.repository.RestaurantsRepository;
import com.nearget.back.repository.SmallDistrictRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Slf4j
@AllArgsConstructor
@Transactional
public class SmallDistrictServiceImpl implements SmallDistrictService{

    private final SmallDistrictRepository smallDistrictRepository;
    private final RestaurantsDataRepository restaurantsDataRepository;

    @Override
    public void saveSmallDistrict(SmallDistrictEnum smallDistrict) {

        SmallDistrictCategoryCount smallDistrictCategoryCount = SmallDistrictCategoryCount.builder()
                .category(null)
                .count(restaurantsDataRepository.countByAddressContaining(smallDistrict.getName()))
                .build();

        SmallDistrict smallDistrictEntity = SmallDistrict.builder()
                .smallDistrict(smallDistrict.getName())
                .lat(smallDistrict.getLat())
                .lng(smallDistrict.getLng())
                .build();

        smallDistrictEntity.getSmallDistrictCategoryCountList().add(smallDistrictCategoryCount);

        for (Category category : Category.values()) {

            SmallDistrictCategoryCount smallDistrictCategoryCountCategory = SmallDistrictCategoryCount.builder()
                    .category(category)
                    .count(restaurantsDataRepository.countRestaurantsByCategoryForAllSmallDistricts(smallDistrict.getName(), category))
                    .build();

            smallDistrictEntity.getSmallDistrictCategoryCountList().add(smallDistrictCategoryCountCategory);

        }

        smallDistrictRepository.save(smallDistrictEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DistrictDTO> countRestaurantsByCategory(String category, Object bounds) {
        Gson gson = new Gson();
        LinkedHashMap<String, Double> map = bounds instanceof String ?
                gson.fromJson((String) bounds, LinkedHashMap.class) :
                gson.fromJson(gson.toJson(bounds), LinkedHashMap.class);

        double swLng = map.get("ha");
        double swLat = map.get("qa");
        double neLng = map.get("oa");
        double neLat = map.get("pa");

        List<SmallDistrict> smallDistrictList = smallDistrictRepository.findAllByLngBetweenAndLatBetween(swLng, neLng, swLat, neLat);
        List<DistrictDTO> districtDTOList = new ArrayList<>();

        for (SmallDistrict smallDistrict : smallDistrictList) {
            long count = smallDistrict.getSmallDistrictCategoryCountList().stream()
                    .filter(districtCategoryCount -> category.equals("ALL") ? districtCategoryCount.getCategory() == null :
                            districtCategoryCount.getCategory() != null && districtCategoryCount.getCategory().equals(Category.of(category)))
                    .findFirst()
                    .orElseThrow(() -> new NoSuchElementException("No category count found"))
                    .getCount();

            districtDTOList.add(DistrictDTO.builder()
                    .districtName(smallDistrict.getSmallDistrict())
                    .count(count)
                    .lat(smallDistrict.getLat())
                    .lng(smallDistrict.getLng())
                    .build());
        }

        return districtDTOList;
    }

}
