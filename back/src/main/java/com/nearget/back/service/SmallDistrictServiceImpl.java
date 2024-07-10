package com.nearget.back.service;

import com.nearget.back.domain.SmallDistrict;
import com.nearget.back.domain.SmallDistrictEnum;
import com.nearget.back.repository.RestaurantsRepository;
import com.nearget.back.repository.SmallDistrictRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@AllArgsConstructor
@Transactional
public class SmallDistrictServiceImpl implements SmallDistrictService{

    private final SmallDistrictRepository smallDistrictRepository;
    private final RestaurantsRepository restaurantRepository;

    @Override
    public void saveSmallDistrict(SmallDistrictEnum smallDistrict) {

        SmallDistrict smallDistrictEntity = SmallDistrict.builder()
                .smallDistrict(smallDistrict.getName())
                .lat(smallDistrict.getLat())
                .lng(smallDistrict.getLng())
                .count(restaurantRepository.countByAddressContaining(smallDistrict.getName()))
                .build();

        smallDistrictRepository.save(smallDistrictEntity);
    }
}
