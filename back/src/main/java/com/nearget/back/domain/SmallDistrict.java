package com.nearget.back.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SmallDistrict {

    @Id
    private String smallDistrict;

    private Double lat;

    private Double lng;

    private Long count;
}
