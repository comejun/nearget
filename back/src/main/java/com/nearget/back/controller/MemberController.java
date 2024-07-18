package com.nearget.back.controller;

import com.nearget.back.domain.Member;
import com.nearget.back.dto.DataMemberDTO;
import com.nearget.back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    @PutMapping("/{email}/disable")
    public ResponseEntity<Member> disableMember(@PathVariable String email) {
        Member updatedMember = memberService.disableMember(email);
        log.info("************ MemberController - disableMember : {}", email);
        return ResponseEntity.ok(updatedMember);
    }

    // 좋아요 리스트 조회
    @GetMapping("/{email}/like")
    public List<String> getLikeList(@PathVariable String email) {
        log.info("************ MemberController - getLikeList : {}", email);
        return memberService.getLikeList(email);
    }

    @PutMapping("/{email}/like/{restaurantId}")
    public void changeLike(@PathVariable String email, @PathVariable String restaurantId) {
        // 좋아요 추가/삭제
        memberService.changeLike(email, restaurantId);
    }

}
