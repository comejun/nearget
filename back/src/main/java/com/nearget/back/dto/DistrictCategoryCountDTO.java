package com.nearget.back.dto;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.DistrictCategoryCount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DistrictCategoryCountDTO {

    private Category category;

    private Long count;

    public static List<DistrictCategoryCount> toDistrictCategoryCountEntityList(List<DistrictCategoryCountDTO> districtCategoryCountDTOList){
        return districtCategoryCountDTOList.stream().map(districtCategoryCountDTO -> DistrictCategoryCount.builder()
                .category(districtCategoryCountDTO.getCategory())
                .count(districtCategoryCountDTO.getCount())
                .build()).toList();
    }
}
