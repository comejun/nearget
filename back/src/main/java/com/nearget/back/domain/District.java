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
public class District {

    @Id
    private String district;

    private Double lat;

    private Double lng;

  @ElementCollection
    @Builder.Default
    private List<DistrictCategoryCount> districtCategoryCountList = new ArrayList<>();
}
