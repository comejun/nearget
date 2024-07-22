package com.nearget.back.service;

import com.nearget.back.domain.SmallDistrictEnum;
import com.nearget.back.dto.DistrictDTO;

import java.util.List;

public interface SmallDistrictService {

    void saveSmallDistrict(SmallDistrictEnum smallDistrict);

    List<DistrictDTO> countRestaurantsByCategory(String category,Object bounds);

}
