package com.nearget.back.repository;

import com.nearget.back.domain.RestaurantsGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantsGroupRepository extends JpaRepository<RestaurantsGroup, Long> {
}
