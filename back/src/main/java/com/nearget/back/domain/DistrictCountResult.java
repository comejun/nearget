package com.nearget.back.domain;

import lombok.Data;

@Data
public class DistrictCountResult {
    private String name;
    private Long count;
    private Double lat;
    private Double lng;

    public DistrictCountResult(String name, Long count, Double lat, Double lng) {
        this.name = name;
        this.count = count;
        this.lat = lat;
        this.lng = lng;
    }

    }
