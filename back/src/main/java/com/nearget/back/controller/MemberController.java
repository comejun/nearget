package com.nearget.back.controller;

import com.nearget.back.dto.DataMemberDTO;
import com.nearget.back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원 조회
    @GetMapping("/{email}")
    public DataMemberDTO getMember(@PathVariable("email")String email){
        log.info("************ MemberController - getMember -email : {}", email);
        DataMemberDTO member = memberService.getMember(email);
        log.info(member.toString());
        return member;
    }

    //회원 수정
    @PutMapping("/modify")
    public Map<String, String> modify(@RequestBody DataMemberDTO dataMemberDTO) {
        log.info("************ MemberController - modify -dataMemberDTO : {}", dataMemberDTO);
        memberService.modifyMember(dataMemberDTO);
        return Map.of("result", "success");
    }

    // 회원 탈퇴
}
