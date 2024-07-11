package com.nearget.back.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    // id는 email로 설정
    private String email;

    // TODO: password 삭제 예정
    @Column(length = 500)
    private String password;

    // 닉네임
    @Column(nullable = false)
    private String nickname;

    // 프로필 사진
    @Builder.Default
    private String profileImg = "";

    // 탈퇴 여부
    private boolean disabled;

    @ElementCollection
    @Builder.Default
    @Enumerated(EnumType.STRING) // enum 문자열로 들어가도록
    // enum 타입 권한을 리스트로 사용
    private List<Role> roleList = new ArrayList<>();

    // 회원 가입일
    @Builder.Default
    private LocalDateTime createdDate = LocalDateTime.now();

    // 탈퇴일
    private LocalDateTime disabledDate;

    // 신규 회원 여부
    @Builder.Default
    private boolean isNew = true;

    // 라이크 리스트
    @ElementCollection
    @Builder.Default
    private List<Long> likeRestaurantList = new ArrayList<>();

    // ********** 값 수정 함수 **********

    // 닉네임 수정
    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    // 프로필 사진 수정
    public void updateProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    // 탈퇴 여부 수정
    public void updateDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    // 탈퇴일 수정
    public void updateDisabledDate( ) {
        this.disabledDate = LocalDateTime.now();
    }

    // 신규 회원 여부 수정
    public void updateIsNew(boolean isNew) {
        this.isNew = isNew;
    }

    // 권한 추가
    public void addRole(Role role) {
        roleList.add(role);
    }
    // 권한 모두 삭제
    public void clearRole() {
        roleList.clear();
    }


}
