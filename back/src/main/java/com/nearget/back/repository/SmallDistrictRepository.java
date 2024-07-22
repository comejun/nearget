package com.nearget.back.repository;

import com.nearget.back.domain.District;
import com.nearget.back.domain.SmallDistrict;
import com.nearget.back.domain.SmallDistrictEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SmallDistrictRepository extends JpaRepository<SmallDistrict, String>{

    SmallDistrict findBySmallDistrict(String smallDistrict);

    SmallDistrict findByLngBetweenAndLatBetween(double swLng, double neLng, double swLat, double neLat);

    // swLat, swLng, neLat, neLng를 주어진 경계로 하는 smallDistrict 전체 조회
    @Query("SELECT s FROM SmallDistrict s WHERE s.lat BETWEEN :swLat AND :neLat AND s.lng BETWEEN :swLng AND :neLng")
    List<SmallDistrict> findAllByLngBetweenAndLatBetween(double swLng, double neLng, double swLat, double neLat);
}
