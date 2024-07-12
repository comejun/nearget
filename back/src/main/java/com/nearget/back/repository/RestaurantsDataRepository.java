package com.nearget.back.repository;

import com.nearget.back.domain.RestaurantsData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantsDataRepository extends JpaRepository<RestaurantsData, Long> {
}
