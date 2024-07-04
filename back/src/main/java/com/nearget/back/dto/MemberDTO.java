package com.nearget.back.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// UserDetails 인터페이스와 호환되도록 구현 (자식 클래스가 됨)
public class MemberDTO extends User {

    private String email;
    private String password;
    private String nickname;
    private String profileImg;
    private boolean disabled;
    private List<String> roleNames;
    private LocalDateTime createdDate;
    private LocalDateTime disabledDate;
    private boolean isNew;

    public MemberDTO(String email, String password, String nickname, String profileImg, boolean disabled, List<String> roleNames, LocalDateTime createdDate, LocalDateTime disabledDate, boolean isNew) {
        super(email, password, roleNames.stream()
                .map(str -> new SimpleGrantedAuthority("ROLE_" + str))
                .collect(Collectors.toList()));
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

    // 현재 사용자 정보를 Map 타입으로 리턴 : JWT 를 위한 메서드 -> 추후 JWT 문자열 생성시 사용
    // MemberDTO -> Map<String,Object> 타입으로 변환해서 리턴
    public Map<String, Object> getClaims() {
        Map<String, Object> map = new HashMap<>();
        map.put("email", email);
        map.put("password", password); // 비번은 나중에 전달 안하는 것으로 변경. 지금은 확인차 추가
        map.put("nickname", nickname);
        map.put("profileImg", profileImg);
        map.put("disabled", disabled);
        map.put("roleNames", roleNames);
        map.put("isNew", isNew);
        return map;
    }

}
