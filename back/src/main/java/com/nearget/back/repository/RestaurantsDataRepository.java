package com.nearget.back.repository;

import com.nearget.back.domain.RestaurantsData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantsDataRepository extends JpaRepository<RestaurantsData, Long> {

    // lat, lng를 기준으로 1km 이내의 restaurantImage가 "없음"또는 ""가 아닌 랜덤 음식점 5개 조회
    @Query(value = "SELECT * FROM restaurants_data WHERE lat BETWEEN ?1 AND ?2 AND lng BETWEEN ?3 AND ?4 AND restaurant_image NOT IN ('없음','') ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<RestaurantsData> findTop5ByLatBetweenAndLngBetween(Double lat1, Double lat2, Double lng1, Double lng2);
}
