package com.nearget.back.service;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.District;
import com.nearget.back.domain.DistrictCategoryCount;
import com.nearget.back.domain.DistrictEnum;
import com.nearget.back.dto.DistrictDTO;
import com.nearget.back.repository.DistrictRepository;
import com.nearget.back.repository.RestaurantsDataRepository;
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
    private final RestaurantsDataRepository restaurantsDataRepository;


    @Override
    public void saveDistrict(DistrictEnum district) {

        DistrictCategoryCount districtCategoryCount = DistrictCategoryCount.builder()
                .category(null)
                .count(restaurantsDataRepository.countByRestaurantIdWithImageStartingWith(district.getNum()))
                .build();

        District districtEntity = District.builder()
                .district(district.getDistrict())
                .lat(district.getLat())
                .lng(district.getLng())
                .build();

        districtEntity.getDistrictCategoryCountList().add(districtCategoryCount);
        // 카테고리 별로 레스토랑 수를 저장
        for (Category category : Category.values()) {

            DistrictCategoryCount districtCategoryCountCategory = DistrictCategoryCount.builder()
                    .category(category)
                    .count(restaurantsDataRepository.countByRestaurantIdWithImageStartingWithAndCategory(district.getNum(), category))
                    .build();

            districtEntity.getDistrictCategoryCountList().add(districtCategoryCountCategory);

        }

        districtRepository.save(districtEntity);

    }


    // 구 단위 클러스터시 불러올 미리 계산된 데이터 가져오기
    @Override
    @Transactional(readOnly = true)
    public List<DistrictDTO> countRestaurantsByCategory(String category) {

        log.info("************ DistrictServiceImpl - countRestaurantsByCategory -category : {}", category);

        List<DistrictDTO> districtDTOList = new ArrayList<>();

        if (category.equals("ALL")) {
            for (int i = 0; i < DistrictEnum.values().length; i++) {
                DistrictDTO districtDTO = DistrictDTO.builder()
                        .districtName(DistrictEnum.values()[i].getDistrict())
                        .count(districtRepository.findByDistrict(DistrictEnum.values()[i].getDistrict()).getDistrictCategoryCountList().get(0).getCount())
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
                    .count(districtRepository.findByDistrict(DistrictEnum.values()[i].getDistrict()).getDistrictCategoryCountList().stream()
                            .filter(districtCategoryCount -> districtCategoryCount.getCategory() != null && districtCategoryCount.getCategory().equals(categoryEntity))
                            .findFirst().get().getCount())
                    .lat(DistrictEnum.values()[i].getLat())
                    .lng(DistrictEnum.values()[i].getLng())
                    .build();
            districtDTOList.add(districtDTO);
        }

        return districtDTOList;
    }
}
