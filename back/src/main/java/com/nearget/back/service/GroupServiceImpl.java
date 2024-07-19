package com.nearget.back.service;

import com.nearget.back.domain.Member;
import com.nearget.back.domain.Restaurant;
import com.nearget.back.domain.RestaurantsData;
import com.nearget.back.domain.RestaurantsGroup;
import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.dto.RestaurantsGroupDTO;
import com.nearget.back.repository.MemberRepository;
import com.nearget.back.repository.RestaurantsDataRepository;
import com.nearget.back.repository.RestaurantsGroupRepository;
import com.nearget.back.repository.RestaurantsRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
@Transactional
public class GroupServiceImpl implements GroupService{

    private final RestaurantsGroupRepository restaurantsGroupRepository;
    private final RestaurantsRepository restaurantsRepository;
    private final MemberRepository memberRepository;
    private final RestaurantsDataRepository restaurantsDataRepository;


    @Override
    public RestaurantsGroupDTO getGroupById(Long groupId) {
        RestaurantsGroup group = restaurantsGroupRepository.findById(groupId).orElseThrow(() -> new IllegalArgumentException("Invalid group ID: " + groupId));
        RestaurantsGroupDTO restaurantsGroupDTO = RestaurantsGroupDTO.convert(group);
        return restaurantsGroupDTO;
    }


    @Override
    public List<RestaurantsGroupDTO> getGroupsByEmail(String email) {
        // 이메일에 해당하는 그룹을 데이터베이스에서 조회
        List<RestaurantsGroup> restaurantsGroups = restaurantsGroupRepository.findByMemberEmail(email);

        // RestaurantsGroup 객체를 RestaurantsGroupDTO 객체로 변환
        List<RestaurantsGroupDTO> restaurantsGroupDTOlist = new ArrayList<>();
        for (RestaurantsGroup restaurantsGroup : restaurantsGroups) {
            RestaurantsGroupDTO restaurantsGroupDTO = RestaurantsGroupDTO.convert(restaurantsGroup);
            restaurantsGroupDTOlist.add(restaurantsGroupDTO);
        }

        return restaurantsGroupDTOlist;
    }

    @Override
    public List<RestaurantDTO> getGroupList(Long groupId) {

        // groupId에 해당하는 RestaurantsGroup 조회
        RestaurantsGroup group = restaurantsGroupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid group ID: " + groupId));
        // RestaurantsGroup의 Restaurant 리스트를 RestaurantDTO 리스트로 변환
        List<RestaurantDTO> restaurantDTOList = new ArrayList<>();
        for (RestaurantsData restaurant : group.getRestaurantList()) {
            RestaurantDTO restaurantDTO = restaurantsDataRepository.findById(restaurant.getId()).orElseThrow().toDTO();
            restaurantDTOList.add(restaurantDTO);
        }
        return restaurantDTOList;
    }


    @Override // 추가
    public void add(RestaurantsGroupDTO restaurantsGroupDTO) {
        log.info("ResServiceImpl --> add" + restaurantsGroupDTO);
        RestaurantsGroup restaurantsGroup = dtoToEntity(restaurantsGroupDTO);
        RestaurantsGroup saved = restaurantsGroupRepository.save(restaurantsGroup);
    }

    @Override // 수정
    public void edit(RestaurantsGroupDTO restaurantsGroupDTO) {
        log.info("ResServiceImpl --> modify" + restaurantsGroupDTO);
        RestaurantsGroup restaurantsGroup = restaurantsGroupRepository.findById(restaurantsGroupDTO.getGroupId())
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 존재하지 않습니다."));
        // 수정사항 업데이트
        restaurantsGroup.changeGroupName(restaurantsGroupDTO.getGroupName());
        restaurantsGroup.changeThImg(restaurantsGroupDTO.getThImg());
        // 변경사항 저장
        restaurantsGroupRepository.save(restaurantsGroup);
    }


    @Override // 삭제
    public void delete(Long groupId) {
        restaurantsGroupRepository.deleteById(groupId);
    }


    @Override // 그룹에 추가
    public void addPlace(Long groupId, Long restaurantId) {
        // groupId에 해당하는 RestaurantsGroup 조회
        RestaurantsGroup group = restaurantsGroupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid group ID: " + groupId));

        group.addRestaurant(restaurantsDataRepository.findById(restaurantId).orElseThrow());

        // RestaurantsGroup 저장
        restaurantsGroupRepository.save(group);
    }

    @Override // 그룹에 삭제
    public void deletePlace(Long id, Long groupId) {
        // id에 해당하는 Restaurant 조회
        Restaurant restaurant = restaurantsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid restaurant ID: " + id));

        // groupId에 해당하는 RestaurantsGroup 조회
        RestaurantsGroup group = restaurantsGroupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid group ID: " + groupId));

        // RestaurantsGroup에서 Restaurant 삭제
        group.getRestaurantList().remove(restaurant);

        // RestaurantsGroup 저장
        restaurantsGroupRepository.save(group);
    }

    private RestaurantsGroup dtoToEntity(RestaurantsGroupDTO restaurantsGroupDTO){
        // MemberRepository를 사용하여 이메일 주소로 Member 엔티티를 조회합니다.
        Member member = memberRepository.findByEmail(restaurantsGroupDTO.getMemberEmail())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        RestaurantsGroup restaurantsGroup = RestaurantsGroup.builder()
                .groupId(restaurantsGroupDTO.getGroupId())
                .groupName(restaurantsGroupDTO.getGroupName())
                .thImg(restaurantsGroupDTO.getThImg())
                .member(member)
                .restaurantList(restaurantsGroupDTO.getRestaurantList())
                .build();
        return restaurantsGroup;
    }

}


