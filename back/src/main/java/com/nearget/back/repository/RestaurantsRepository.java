package com.nearget.back.repository;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.DistrictCountResult;
import com.nearget.back.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantsRepository extends JpaRepository<Restaurant, Long> {

    // swLat, swLng, neLat, neLng를 주어진 경계로 하는 식당을 조회하는 쿼리
    List<Restaurant> findByLngBetweenAndLatBetween(double swLng, double neLng, double swLat, double neLat);

    // swLat, swLng, neLat, neLng를 주어진 경계로 하는 식당을 카테고리로 조회하는 쿼리
    List<Restaurant> findByLngBetweenAndLatBetweenAndCategory(double swLng, double neLng, double swLat, double neLat, Category category);

}
