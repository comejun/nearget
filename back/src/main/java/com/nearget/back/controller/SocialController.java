package com.nearget.back.controller;

import com.nearget.back.dto.MemberDTO;
import com.nearget.back.service.MemberService;
import com.nearget.back.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class SocialController {

    private final MemberService memberService;
    @GetMapping("/api/member/kakao")
    public Map<String, Object> getMemberFromKakao(String accessToken) {
        log.info("**************SocialController-getMemberFromKakao - accessToken: {}",
                accessToken);
        MemberDTO kakaoMember = memberService.getKakaoMember(accessToken);
        Map<String, Object> claims = kakaoMember.getClaims();
        String jwtAccessToken = JWTUtil.generateToken(claims, 10);
        String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);
        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);

        return claims;
    }
}
