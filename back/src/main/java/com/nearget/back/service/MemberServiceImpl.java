package com.nearget.back.service;

import com.nearget.back.domain.Member;
import com.nearget.back.domain.Restaurant;
import com.nearget.back.domain.Role;
import com.nearget.back.dto.DataMemberDTO;
import com.nearget.back.dto.MemberDTO;
import com.nearget.back.repository.MemberRepository;
import com.nearget.back.repository.RestaurantsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final RestaurantsRepository restaurantsRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    // 멤버 조회
    @Override
    public DataMemberDTO getMember(String email) {
        Member findMember = memberRepository.getMemberWithRoles(email);
        // Member Entity -> DataMemberDTO
        return modelMapper.map(findMember, DataMemberDTO.class);
    }

    @Override
    public MemberDTO getKakaoMember(String accessToken) {
        String email = getEmailFromKakaoAccessToken(accessToken);
        log.info("************ MemberService - getKakaoMember -email : {}", email);
        // DB에 회원이 있는지 조회
        Optional<Member> findMember = memberRepository.findById(email);
        // 기존회원 -> 로그인
        if (findMember.isPresent()) {
            MemberDTO memberDTO = entityToDTO(findMember.get());
            return memberDTO;
        }
        // 회원이 아닌경우 -> 회원 추가
        // 임시 비번으로 회원 DB에 추가, 해당 정보로 memberDTO 리턴
        Member newMember = makeNewMember(email,accessToken); // 소셜회원으로 만들어 받기
        memberRepository.save(newMember); // DB에 저장
        MemberDTO memberDTO = entityToDTO(newMember); // DTO변환해 리턴
        return memberDTO;
    }

    // 회원 정보 수정
    @Override
    public void modifyMember(DataMemberDTO dataMemberDTO) {
        // DataMemberDTO -> Member Entity
        Member member=  memberRepository.findById(dataMemberDTO.getEmail()).orElseThrow(
                ()-> new IllegalArgumentException("해당 회원이 없습니다.")
        );
        member.updateNickname(dataMemberDTO.getNickname());
        member.updateProfileImg(dataMemberDTO.getProfileImg());
        member.updateIsNew(false);
        memberRepository.save(member);
    }

    // 소셜회원 Member 엔티티 만들어주는 메서드
    private Member makeNewMember(String email, String accessToken) {
// 임시비번 만들어서 Member 엔티티 생성해 리턴
        String tmpPassword = makeTempPassword();
        log.info("****** MemberService - tmpPassword : {}", tmpPassword);

        Object kakaoAccount = getDataFromKakaoAccesToken(accessToken);

        log.info("****** MemberService - kakaoAccount : {}", kakaoAccount);
        // kakaoAccount 에서 닉네임, 프로필 사진 받아서 Member 엔티티 생성
        // 닉네임, 프로필 사진이 없을 경우를 대비해서 기본값 설정
        String nickname = "";
        String profile = "";
        if (kakaoAccount != null) {
            LinkedHashMap<String, String> account = (LinkedHashMap<String, String>) kakaoAccount;
            if (account.get("nickname") != null && !account.get("nickname").equals("")) {
                nickname = account.get("nickname");
            }
            if (account.get("profile_image_url") != null && !account.get("profile_image_url").equals("")) {
                profile = account.get("profile_image_url");
            }
            log.info("****** MemberService - nickname : {}", nickname);
            log.info("****** MemberService - profile : {}", profile);

        }
        boolean needChangeProfile = false;


        if (nickname.equals("SocialMember") && profile.equals("")) {
            needChangeProfile = true;
        }

//        String nickname = "SocialMember";
        Member member = Member.builder()
                .email(email)
                .password(passwordEncoder.encode(tmpPassword))
                .nickname(nickname)
                .profileImg(profile)
                .build();
        member.addRole(Role.USER);
        return member;
    }


    // 임시비번 만들어주는 메서드
    private String makeTempPassword() {
// char 한글자씩 랜덤으로 누적 추가해서 문자열 만들어주기
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < 10; i++) {
            stringBuffer.append((char) ((int) (Math.random() * 55) + 65));
        }
        return stringBuffer.toString(); // 문자열로 리턴
    }

    // 카카오 사용자 닉네임, 프로필 사진 가져오기
    private Object getDataFromKakaoAccesToken(String accessToken) {
        // 카카오 사용자 정보 요청
        String kakakoGetUserURL = "https://kapi.kakao.com/v2/user/me";
        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }
        // 카카오서버에 RestTemplate 으로 사용자 정보 HTTP 요청
        RestTemplate restTemplate = new RestTemplate();
        // 헤더정보 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        // 헤더 정보를 포함함 HttpEntity로 요청 객체 만들기 (request)
        HttpEntity<String> entity = new HttpEntity<>(headers);
        // 요청 경로 생성해주는 클래스 이용
        UriComponents uriBuild =
                UriComponentsBuilder.fromHttpUrl(kakakoGetUserURL).build();
        // RestTemplate의 exchange() 메서드를 이용해 요청보내기 -> 리턴은 Map
        ResponseEntity<LinkedHashMap> response =
                restTemplate.exchange(uriBuild.toString(), HttpMethod.GET, entity,
                        LinkedHashMap.class);
        // Body에서 응답 데이터 꺼내기
        LinkedHashMap<String, LinkedHashMap> body = response.getBody();
        // 응답 내용 중 카카오 계정 정보 꺼내기
        Object kakaoAccount = body.get("kakao_account").get("profile");

        return kakaoAccount;
    }


    private String getEmailFromKakaoAccessToken(String accessToken) {
// 카카오 사용자 정보 요청
        String kakakoGetUserURL = "https://kapi.kakao.com/v2/user/me";
        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }
// 카카오서버에 RestTemplate 으로 사용자 정보 HTTP 요청
        RestTemplate restTemplate = new RestTemplate();
// 헤더정보 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
// 헤더 정보를 포함함 HttpEntity로 요청 객체 만들기 (request)
        HttpEntity<String> entity = new HttpEntity<>(headers);
// 요청 경로 생성해주는 클래스 이용
        UriComponents uriBuild =
                UriComponentsBuilder.fromHttpUrl(kakakoGetUserURL).build();
// RestTemplate의 exchange() 메서드를 이용해 요청보내기 -> 리턴은 Map
        ResponseEntity<LinkedHashMap> response =
                restTemplate.exchange(uriBuild.toString(), HttpMethod.GET, entity,
                        LinkedHashMap.class);
        log.info("******** response : {}", response);
// Body에서 응답 데이터 꺼내기
        LinkedHashMap<String, LinkedHashMap> body = response.getBody();
        log.info("******** body : {}", body);
// 응답 내용 중 카카오 계정 정보 꺼내기
        LinkedHashMap<String, String> kakaoAccount = body.get("kakao_account");
        log.info("******** kakaoAccount : {}", kakaoAccount);
        return kakaoAccount.get("email"); // 이메일만 꺼내서 리턴
    }

    // 회원 탈퇴
    public Member disableMember(String email) {
        Member member = memberRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        member.updateDisabled(true);
        member.updateDisabledDate();
        return memberRepository.save(member);
    }

    // 좋아요 추가
    @Override
    public void addLike(String email, Long id) {
        Member member = memberRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email: " + email));
        Restaurant restaurant = restaurantsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid restaurant ID: " + id));
        member.addLike(restaurant.getId());
        memberRepository.save(member);
    }

    // 좋아요 삭제
    @Override
    public void deleteLike(String email, Long id) {
        Member member = memberRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email: " + email));
        member.deleteLike(id);
        memberRepository.save(member);
    }
}
