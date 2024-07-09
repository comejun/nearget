package com.nearget.back.dto;

import com.nearget.back.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDTO {

    private Long id;
    private String address;
    private Category category;
    private Double lat;
    private Double lng;
    private String name;
    private String phone;
}
