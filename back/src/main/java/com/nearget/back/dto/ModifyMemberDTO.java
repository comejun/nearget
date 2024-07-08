package com.nearget.back.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
public class ModifyMemberDTO {

    private String email;
    private String password;
    private String nickname;
    private String profileImg;
    private boolean disabled;
    private List<String> roleNames;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime disabledDate;
    private boolean isNew;

    public ModifyMemberDTO(String email, String password, String nickname, String profileImg, boolean disabled, List<String> roleNames, LocalDateTime createdDate, LocalDateTime disabledDate, boolean isNew) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.disabled = disabled;
        this.roleNames = roleNames;
        this.createdDate = createdDate;
        this.disabledDate = disabledDate;
        this.isNew = isNew;
    }

}
