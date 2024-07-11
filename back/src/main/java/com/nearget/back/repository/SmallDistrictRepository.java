package com.nearget.back.repository;

import com.nearget.back.domain.District;
import com.nearget.back.domain.SmallDistrict;
import com.nearget.back.domain.SmallDistrictEnum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SmallDistrictRepository extends JpaRepository<SmallDistrict, String>{

    SmallDistrict findBySmallDistrict(String smallDistrict);

}
