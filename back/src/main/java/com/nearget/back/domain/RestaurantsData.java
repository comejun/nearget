package com.nearget.back.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantsData {

    @Id
    private Long id;

    private String restaurantName;

    @Builder.Default
    private String restaurantImage="";

    @ElementCollection
    @Builder.Default
    private List<RestaurantMenu> menuList = new ArrayList<>();

}
