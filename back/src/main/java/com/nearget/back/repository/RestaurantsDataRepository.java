package com.nearget.back.repository;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.DistrictCountResult;
import com.nearget.back.domain.Restaurant;
import com.nearget.back.domain.RestaurantsData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantsDataRepository extends JpaRepository<RestaurantsData, Long> {

    // DB 스케쥴러 위한 쿼리문

    // 구단위 클러스터를 위한 자체 데이터 저장을 위한 쿼리문
    // Id가 300 으로 시작하는 restaurantImage가 "없음"이아닌 음식점 갯수 조회
    @Query("SELECT count(r) FROM RestaurantsData r WHERE CAST(r.id AS string) LIKE :restaurantId% AND r.restaurantImage NOT IN ('없음')")
    Long countByRestaurantIdWithImageStartingWith(Long restaurantId);

    // Id가 300 으로 시작하는 restaurantImage가 "없음"이아닌 음식점 갯수 카테고리별 조회
    @Query("SELECT count(r) FROM RestaurantsData r WHERE CAST(r.id AS string) LIKE :restaurantId% AND r.restaurantImage NOT IN ('없음') AND r.category = :category")
    Long countByRestaurantIdWithImageStartingWithAndCategory(Long restaurantId, Category category);

    // 동단위 클러스터를 위한 자체 데이터 저장을 위한 쿼리문
    // adrress가 주어진 주소를 포함하는 restaurantImage가 "없음"이아닌 식당을 개수를 구하는 쿼리
    @Query("SELECT count(r) FROM RestaurantsData r WHERE r.restaurantAddress LIKE %:address% AND r.restaurantImage NOT IN ('없음')")
    Long countByAddressContaining(@Param("address") String address);

    // 카테고리로 모든 소구역의 restaurantImage가 "없음"이아닌  식당 개수를 조회하는 쿼리
    @Query("SELECT count(r) FROM RestaurantsData r WHERE r.restaurantAddress LIKE %:address% AND r.restaurantImage NOT IN ('없음') AND r.category = :category")
    Long countRestaurantsByCategoryForAllSmallDistricts(@Param("address") String address, @Param("category") Category category);


    // ********** DB 스케쥴러 위한 쿼리문 종료 *********

    // 지도 최소 확대 단위 위한 쿼리문

    // swLat, swLng, neLat, neLng를 주어진 경계로 하는  restaurantImage가 "없음"이아닌 식당을 조회하는 쿼리
    @Query("SELECT r FROM RestaurantsData r WHERE r.lat BETWEEN :swLat AND :neLat AND r.lng BETWEEN :swLng AND :neLng AND r.restaurantImage NOT IN ('없음')")
    List<RestaurantsData> findByLngBetweenAndLatBetween(double swLng, double neLng, double swLat, double neLat);

    // swLat, swLng, neLat, neLng를 주어진 경계로 하는  restaurantImage가 "없음"이아닌 식당을 카테고리로 조회하는 쿼리
    @Query("SELECT r FROM RestaurantsData r WHERE r.lat BETWEEN :swLat AND :neLat AND r.lng BETWEEN :swLng AND :neLng AND r.restaurantImage NOT IN ('없음') AND r.category = :category")
    List<RestaurantsData> findByLngBetweenAndLatBetweenAndCategory(double swLng, double neLng, double swLat, double neLat, Category category);


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

// 거리순 음식점 조회
    @Query(value = "SELECT *, ST_Distance_Sphere(point(r.lng, r.lat), point(:lng, :lat)) as distance FROM restaurants_data r WHERE r.restaurant_image NOT IN ('없음','') ORDER BY distance ASC",
            countQuery = "SELECT count(*) FROM restaurants_data WHERE restaurant_image NOT IN ('없음','')",
            nativeQuery = true)
    Page<RestaurantsData> findRestaurantsNearby(@Param("lat") double lat, @Param("lng") double lng, Pageable pageable);

    // 카테고리별 거리순 음식점 조회
    @Query(value = "SELECT *, ST_Distance_Sphere(point(r.lng, r.lat), point(:lng, :lat)) as distance FROM restaurants_data r WHERE r.restaurant_image NOT IN ('없음','') AND r.category = :category ORDER BY distance ASC",
            countQuery = "SELECT count(*) FROM restaurants_data WHERE restaurant_image NOT IN ('없음','') AND category = :category",
            nativeQuery = true)
    Page<RestaurantsData> findRestaurantsNearbyByCategory(@Param("lat") double lat, @Param("lng") double lng, @Param("category") String category, Pageable pageable);



    @Query(value = "SELECT * FROM restaurants_data r WHERE r.lat BETWEEN ?1 AND ?2 AND r.lng BETWEEN ?3 AND ?4 AND r.restaurant_image NOT IN ('없음','')", nativeQuery = true)
    List<RestaurantsData> findByLatBetweenAndLngBetween(Double lat1, Double lat2, Double lng1, Double lng2);

    // lat, lng를 기준으로 1km 이내의 restaurantImage가  ""인음식점 조회
    @Query(value = "SELECT * FROM restaurants_data WHERE lat BETWEEN ?1 AND ?2 AND lng BETWEEN ?3 AND ?4 AND restaurant_image = ''", nativeQuery = true)
    List<RestaurantsData> findByLatBetweenAndLngBetweenAndRestaurantImage(Double lat1, Double lat2, Double lng1, Double lng2);


}
