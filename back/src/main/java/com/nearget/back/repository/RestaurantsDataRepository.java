package com.nearget.back.repository;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.RestaurantsData;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantsDataRepository extends JpaRepository<RestaurantsData, Long> {

    // lat, lng를 기준으로 1km 이내의 restaurantImage가 "없음"또는 ""가 아닌 랜덤 음식점 5개 조회
    @Query(value = "SELECT * FROM restaurants_data WHERE lat BETWEEN ?1 AND ?2 AND lng BETWEEN ?3 AND ?4 AND restaurant_image NOT IN ('없음','') ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<RestaurantsData> findTop5ByLatBetweenAndLngBetween(Double lat1, Double lat2, Double lng1, Double lng2);

    // lat, lng를 기준으로 1km 이내의 restaurantImage가 "없음"또는 ""가 아닌 category별 랜덤 음식점 5개 조회
    @Query(value = "SELECT * FROM restaurants_data WHERE lat BETWEEN ?1 AND ?2 AND lng BETWEEN ?3 AND ?4 AND restaurant_image NOT IN ('없음','') AND category = ?5 ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<RestaurantsData> findTop5ByLatBetweenAndLngBetweenAndCategory(Double lat1, Double lat2, Double lng1, Double lng2, String category);

    // JPQL로 lat, lng를 기준으로 2km 이내의 restaurantImage가 "없음"또는 ""가 아니고 menuList가 1개 이상인 음식점 조회
    @EntityGraph(attributePaths = {"menuList"})
    @Query("SELECT r FROM RestaurantsData r WHERE r.lat BETWEEN :lat1 AND :lat2 AND r.lng BETWEEN :lng1 AND :lng2 AND r.restaurantImage NOT IN ('없음','') AND SIZE(r.menuList) > 0")
    List<RestaurantsData> findByLatBetweenAndLngBetweenOrderByMenu(Double lat1, Double lat2, Double lng1, Double lng2);

    @Query(value = "SELECT * FROM restaurants_data r WHERE r.lat BETWEEN ?1 AND ?2 AND r.lng BETWEEN ?3 AND ?4 AND r.restaurant_image NOT IN ('없음','') AND r.category = ?5", nativeQuery = true)
    List<RestaurantsData> findByLatBetweenAndLngBetweenAndCategoryOrderByMenu(Double lat1, Double lat2, Double lng1, Double lng2, String category);

    @Query(value = "SELECT * FROM restaurants_data r WHERE r.lat BETWEEN ?1 AND ?2 AND r.lng BETWEEN ?3 AND ?4 AND r.restaurant_image NOT IN ('없음','')", nativeQuery = true)
    List<RestaurantsData> findByLatBetweenAndLngBetween(Double lat1, Double lat2, Double lng1, Double lng2);

    // lat, lng를 기준으로 1km 이내의 restaurantImage가  ""인음식점 조회
    @Query(value = "SELECT * FROM restaurants_data WHERE lat BETWEEN ?1 AND ?2 AND lng BETWEEN ?3 AND ?4 AND restaurant_image = ''", nativeQuery = true)
    List<RestaurantsData> findByLatBetweenAndLngBetweenAndRestaurantImage(Double lat1, Double lat2, Double lng1, Double lng2);


}
