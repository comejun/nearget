package com.nearget.back.repository;

import com.nearget.back.domain.District;
import com.nearget.back.domain.DistrictEnum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistrictRepository extends JpaRepository<District, DistrictEnum> {

    District findByDistrict(String district);
}
