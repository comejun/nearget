package com.nearget.back.repository;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.DistrictCountResult;
import com.nearget.back.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantsRepository extends JpaRepository<Restaurant, Long> {

}
