package com.nearget.back.controller;

import com.nearget.back.domain.Member;
import com.nearget.back.dto.DataMemberDTO;
import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.service.MemberService;
import com.nearget.back.service.RestaurantDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final RestaurantDataService restaurantDataService;

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

    // 좋아요 리스트 자세히 조회
    @PostMapping("/{email}/likedetail")
    public List<RestaurantDTO> getLikeListDetail(@RequestBody Double[]latlng, @PathVariable String email) {
        log.info("************ MemberController - getLikeList : {}", email);
        Double lat = latlng[0];
        Double lng = latlng[1];

        List<String> likeList = memberService.getLikeList(email);
        List<RestaurantDTO> likeListDetail = new ArrayList<>();
        for (String restaurantId : likeList) {
            RestaurantDTO restaurantDTO = restaurantDataService.getRestaurant(Long.parseLong(restaurantId));
            Double distance = calculateDistanceInMeters(lat, lng, restaurantDTO.getLat(), restaurantDTO.getLng());
            restaurantDTO.changeDistance(distance);
            likeListDetail.add(restaurantDTO);
        }

        return likeListDetail;
    }

    @PutMapping("/{email}/like/{restaurantId}")
    public void changeLike(@PathVariable String email, @PathVariable String restaurantId) {
        // 좋아요 추가/삭제

        memberService.changeLike(email, restaurantId);
    }

    public static double calculateDistanceInMeters(double lat1, double lng1, double lat2, double lng2) {
        final int R = 6371000; // 지구의 반지름(m)
        double latDistance = Math.toRadians(lat2 - lat1);
        double lngDistance = Math.toRadians(lng2 - lng1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c; // 결과 거리(m)

        return distance;
    }

}
