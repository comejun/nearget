package com.nearget.back.service;

import com.nearget.back.domain.Member;
import com.nearget.back.dto.DataMemberDTO;
import com.nearget.back.dto.MemberDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Transactional
public interface MemberService {

    MemberDTO getKakaoMember(String accessToken);

    // Member Entity -> MemberDTO
    default MemberDTO entityToDTO(Member member) {
        MemberDTO memberDTO = new MemberDTO(
                member.getEmail(),
                member.getPassword(),
                member.getNickname(),
                member.getProfileImg(),
                member.isDisabled(),
        member.getRoleList()
                .stream()
                .map(role -> role.name())
                .collect(Collectors.toList()),
                member.getCreatedDate(),
                member.getDisabledDate(),
                member.isNew());

        return memberDTO;
    }

    // 회원 조회
    DataMemberDTO getMember(String email);
    // 회원 정보 수정 처리
    void modifyMember(DataMemberDTO dataMemberDTO);
    // 회원 탈퇴
    Member disableMember(String email);
}
