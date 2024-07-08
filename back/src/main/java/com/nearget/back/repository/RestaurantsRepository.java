package com.nearget.back.repository;

import com.nearget.back.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantsRepository extends JpaRepository<Restaurant, Long> {
}
