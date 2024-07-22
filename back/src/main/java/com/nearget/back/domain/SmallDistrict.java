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
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SmallDistrict {

    @Id
    private String smallDistrict;

    private Double lat;

    private Double lng;

    @ElementCollection
    @Builder.Default
    private List<SmallDistrictCategoryCount> smallDistrictCategoryCountList = new ArrayList<>();

}
