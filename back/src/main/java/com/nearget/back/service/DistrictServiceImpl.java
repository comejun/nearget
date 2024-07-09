package com.nearget.back.service;

import com.nearget.back.domain.District;
import com.nearget.back.domain.DistrictEnum;
import com.nearget.back.repository.DistrictRepository;
import com.nearget.back.repository.RestaurantsRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@AllArgsConstructor
@Transactional
public class DistrictServiceImpl implements DistrictService{

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
}
