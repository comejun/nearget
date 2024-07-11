package com.nearget.back.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class MapDataDTO {

    int level;
    Object bounds;
    String category;
}
