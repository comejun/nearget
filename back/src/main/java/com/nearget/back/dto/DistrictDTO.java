package com.nearget.back.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DistrictDTO {

    private String districtName;
    private Long count;
    private Double lat;
    private Double lng;
}
