package com.nearget.back.service;

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
import java.util.List;

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
    public List<DistrictDTO> countRestaurantsByCategory(String category) {

        log.info("************ DistrictServiceImpl - countRestaurantsByCategory -category : {}", category);

        List<DistrictDTO> districtDTOList = new ArrayList<>();

        if (category.equals("ALL")) {
            for (int i = 0; i < SmallDistrictEnum.values().length; i++) {
                DistrictDTO districtDTO = DistrictDTO.builder()
                        .districtName(SmallDistrictEnum.values()[i].getName())
                        .count(smallDistrictRepository.findBySmallDistrict(SmallDistrictEnum.values()[i].getName()).getSmallDistrictCategoryCountList().get(0).getCount())
                        .lat(SmallDistrictEnum.values()[i].getLat())
                        .lng(SmallDistrictEnum.values()[i].getLng())
                        .build();
                districtDTOList.add(districtDTO);
            }
            return districtDTOList;
        }

        Category categoryEntity = Category.of(category);
        log.info("************ DistrictServiceImpl - countRestaurantsByCategory -categoryEntity : {}", categoryEntity);

        for (int i = 0; i < SmallDistrictEnum.values().length; i++) {
            DistrictDTO districtDTO = DistrictDTO.builder()
                    .districtName(SmallDistrictEnum.values()[i].getName())
                    .count(smallDistrictRepository.findBySmallDistrict(SmallDistrictEnum.values()[i].getName()).getSmallDistrictCategoryCountList().stream()
                            .filter(districtCategoryCount -> districtCategoryCount.getCategory() != null && districtCategoryCount.getCategory().equals(categoryEntity))
                            .findFirst().get().getCount())
                    .lat(SmallDistrictEnum.values()[i].getLat())
                    .lng(SmallDistrictEnum.values()[i].getLng())
                    .build();
            districtDTOList.add(districtDTO);
        }

        return districtDTOList;
    }

}
