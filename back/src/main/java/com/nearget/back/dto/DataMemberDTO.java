package com.nearget.back.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DataMemberDTO {
    private String email;
    private String nickname;
    private String profileImg;
    private String role;
}

