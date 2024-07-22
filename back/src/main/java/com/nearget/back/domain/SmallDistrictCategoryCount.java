package com.nearget.back.domain;

import com.nearget.back.dto.SmallDistrictCategoryCountDTO;
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
public class SmallDistrictCategoryCount {

    @Enumerated(EnumType.STRING)
    private Category category;

    private Long count;

    public SmallDistrictCategoryCountDTO toDTO(){
        return SmallDistrictCategoryCountDTO.builder()
                .category(category)
                .count(count)
                .build();
    }
}
