package com.nearget.back.repository;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.DistrictCountResult;
import com.nearget.back.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantsRepository extends JpaRepository<Restaurant, Long> {

    // Id가 300 으로 시작하는 식당을 개수를 구하는 쿼리
    @Query("SELECT count(r) FROM Restaurant r WHERE CAST(r.id AS string) LIKE :restaurantId%")
    Long countByRestaurantIdStartingWith(Long restaurantId);

    // Id가 300 으로 시작하는 식당의 개수를 카테고리로 조회하는 쿼리
    @Query("SELECT count(r) FROM Restaurant r WHERE CAST(r.id AS string) LIKE :restaurantId% AND r.category = :category")
    Long countByRestaurantIdAndCategoryStartingWith(Long restaurantId, Category category);

    // adrress가 주어진 주소를 포함하는 식당을 개수를 구하는 쿼리
    @Query("SELECT count(r) FROM Restaurant r WHERE r.address LIKE %:address%")
    Long countByAddressContaining(String address);

    // Id가 300 으로 시작하는 식당의 개수를 카테고리로 조회하는 쿼리
    @Query("SELECT count(r) FROM Restaurant r WHERE r.address LIKE %:address% AND r.category = :category")
    Long countByRestaurantIdAndCategoryStartingWith(String address, Category category);

    @Query("SELECT new com.nearget.back.domain.DistrictCountResult(s.smallDistrict, count(r), s.lat, s.lng) " +
            "FROM Restaurant r RIGHT JOIN SmallDistrict s ON r.address LIKE CONCAT('%', s.smallDistrict, '%') " +
            "WHERE r.category = :category OR :category = 'ALL' " +
            "GROUP BY s.smallDistrict, s.lat, s.lng")
    List<DistrictCountResult> countRestaurantsByCategoryForAllSmallDistricts(@Param("category") Category category);

}
