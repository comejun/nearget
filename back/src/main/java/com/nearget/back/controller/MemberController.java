package com.nearget.back.controller;

import com.nearget.back.dto.ModifyMemberDTO;
import com.nearget.back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원 조회

    //회원 수정
    @PutMapping("/modify")
    public Map<String, String> modify(@RequestBody ModifyMemberDTO modifyMemberDTO) {
        log.info("************ MemberController - modify -dataMemberDTO : {}", modifyMemberDTO);
        memberService.modifyMember(modifyMemberDTO);
        return Map.of("result", "success");
    }

    // 회원 탈퇴
}
