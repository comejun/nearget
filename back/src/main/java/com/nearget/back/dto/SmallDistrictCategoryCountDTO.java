package com.nearget.back.dto;

import com.nearget.back.domain.Category;
import com.nearget.back.domain.SmallDistrictCategoryCount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SmallDistrictCategoryCountDTO {

    private Category category;

    private Long count;

    public static List<SmallDistrictCategoryCount> toSmallDistrictCategoryCountEntityList(List<SmallDistrictCategoryCountDTO> smallDistrictCategoryCountDTOList){
        return smallDistrictCategoryCountDTOList.stream().map(smallDistrictCategoryCountDTO -> SmallDistrictCategoryCount.builder()
                .category(smallDistrictCategoryCountDTO.getCategory())
                .count(smallDistrictCategoryCountDTO.getCount())
                .build()).toList();
    }
}
