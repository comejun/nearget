package com.nearget.back.service;

import com.nearget.back.domain.DistrictEnum;
import com.nearget.back.dto.DistrictDTO;

import java.util.List;

public interface DistrictService {
    void saveDistrict(DistrictEnum district);

    List<DistrictDTO> countRestaurantsByCategory(String category);
}
