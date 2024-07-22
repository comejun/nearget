package com.nearget.back.domain;

import com.nearget.back.dto.DistrictCategoryCountDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DistrictCategoryCount {

    @Enumerated(EnumType.STRING)
    private Category category;

    private Long count;

    public DistrictCategoryCountDTO toDTO(){
        return DistrictCategoryCountDTO.builder()
                .category(category)
                .count(count)
                .build();
    }

}
