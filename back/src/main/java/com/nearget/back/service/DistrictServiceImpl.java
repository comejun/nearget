package com.nearget.back.service;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.District;
import com.nearget.back.domain.DistrictEnum;
import com.nearget.back.dto.DistrictDTO;
import com.nearget.back.repository.DistrictRepository;
import com.nearget.back.repository.RestaurantsRepository;
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
public class DistrictServiceImpl implements DistrictService {

    private final DistrictRepository districtRepository;
    private final RestaurantsRepository restaurantsRepository;

    @Override
    public void saveDistrict(DistrictEnum district) {

        District districtEntity = District.builder()
                .district(district.getDistrict())
                .lat(district.getLat())
                .lng(district.getLng())
                .count(restaurantsRepository.countByRestaurantIdStartingWith(district.getNum()))
                .build();

        districtRepository.save(districtEntity);

    }

    @Override
    public List<DistrictDTO> countRestaurantsByCategory(String category) {

        log.info("************ DistrictServiceImpl - countRestaurantsByCategory -category : {}", category);


        List<DistrictDTO> districtDTOList = new ArrayList<>();

        if (category.equals("ALL")) {
            for (int i = 0; i < DistrictEnum.values().length; i++) {
                DistrictDTO districtDTO = DistrictDTO.builder()
                        .districtName(DistrictEnum.values()[i].getDistrict())
                        .count(districtRepository.findByDistrict(DistrictEnum.values()[i].getDistrict()).getCount())
                        .lat(DistrictEnum.values()[i].getLat())
                        .lng(DistrictEnum.values()[i].getLng())
                        .build();
                districtDTOList.add(districtDTO);
            }
            return districtDTOList;
        }

        Category categoryEntity = Category.of(category);
        log.info("************ DistrictServiceImpl - countRestaurantsByCategory -categoryEntity : {}", categoryEntity);


        for (int i = 0; i < DistrictEnum.values().length; i++) {
            DistrictDTO districtDTO = DistrictDTO.builder()
                    .districtName(DistrictEnum.values()[i].getDistrict())
                    .count(restaurantsRepository.countByRestaurantIdAndCategoryStartingWith(DistrictEnum.values()[i].getNum(), categoryEntity))
                    .lat(DistrictEnum.values()[i].getLat())
                    .lng(DistrictEnum.values()[i].getLng())
                    .build();
            districtDTOList.add(districtDTO);
        }

        return districtDTOList;
    }
}
