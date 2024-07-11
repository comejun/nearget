package com.nearget.back.service;

import com.nearget.back.domain.*;
import com.nearget.back.dto.DistrictDTO;
import com.nearget.back.repository.RestaurantsRepository;
import com.nearget.back.repository.SmallDistrictRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
@Transactional
public class SmallDistrictServiceImpl implements SmallDistrictService{

    private final SmallDistrictRepository smallDistrictRepository;
    private final RestaurantsRepository restaurantsRepository;

    @Override
    public void saveSmallDistrict(SmallDistrictEnum smallDistrict) {

        SmallDistrict smallDistrictEntity = SmallDistrict.builder()
                .smallDistrict(smallDistrict.getName())
                .lat(smallDistrict.getLat())
                .lng(smallDistrict.getLng())
                .count(restaurantsRepository.countByAddressContaining(smallDistrict.getName()))
                .build();

        smallDistrictRepository.save(smallDistrictEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DistrictDTO> countRestaurantsByCategory(String category) {

        log.info("************ DistrictServiceImpl - countRestaurantsByCategory -category : {}", category);

        List<DistrictDTO> districtDTOList = new ArrayList<>();

        if (category.equals("ALL")) {
            for (int i = 0; i < SmallDistrictEnum.values().length; i++) {
                DistrictDTO districtDTO = DistrictDTO.builder()
                        .districtName(SmallDistrictEnum.values()[i].getName())
                        .count(smallDistrictRepository.findBySmallDistrict(SmallDistrictEnum.values()[i].getName()).getCount())
                        .lat(SmallDistrictEnum.values()[i].getLat())
                        .lng(SmallDistrictEnum.values()[i].getLng())
                        .build();
                districtDTOList.add(districtDTO);
            }
            return districtDTOList;
        }

        Category categoryEntity = Category.of(category);
        log.info("************ DistrictServiceImpl - countRestaurantsByCategory -categoryEntity : {}", categoryEntity);

        List<DistrictCountResult> results = restaurantsRepository.countRestaurantsByCategoryForAllSmallDistricts(categoryEntity);

        for (DistrictCountResult result : results) {
            DistrictDTO districtDTO = DistrictDTO.builder()
                    .districtName(result.getName())
                    .count(result.getCount())
                    .lat(result.getLat())
                    .lng(result.getLng())
                    .build();
            districtDTOList.add(districtDTO);
        }

        return districtDTOList;
    }

}
