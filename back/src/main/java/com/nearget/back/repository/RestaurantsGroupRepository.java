package com.nearget.back.repository;

import com.nearget.back.domain.RestaurantsGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantsGroupRepository extends JpaRepository<RestaurantsGroup, Long> {
    List<RestaurantsGroup> findByMemberEmail(String email);
}
