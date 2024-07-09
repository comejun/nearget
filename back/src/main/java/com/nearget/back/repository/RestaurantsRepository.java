package com.nearget.back.repository;

import com.nearget.back.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RestaurantsRepository extends JpaRepository<Restaurant, Long> {

    // Id가 300 으로 시작하는 식당을 개수를 구하는 쿼리
    @Query("SELECT count(r) FROM Restaurant r WHERE CAST(r.id AS string) LIKE :restaurantId%")
    Long countByRestaurantIdStartingWith(Long restaurantId);

    // adrress가 주어진 주소를 포함하는 식당을 개수를 구하는 쿼리
    @Query("SELECT count(r) FROM Restaurant r WHERE r.address LIKE %:address%")
    Long countByAddressContaining(String address);
}
