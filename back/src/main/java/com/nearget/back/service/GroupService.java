package com.nearget.back.service;

import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.dto.RestaurantsGroupDTO;

import java.util.List;

public interface GroupService {

    // 음식점 그룹 리스트 //
    // 아이디로 조회
    RestaurantsGroupDTO getGroupById(Long groupId);

    // 이메일로 조회
    List<RestaurantsGroupDTO> getGroupsByEmail(String email);

    // 그룹 안의 리스트 조회
    List<RestaurantDTO> getGroupList(Long groupId);

    // 추가
    void add(RestaurantsGroupDTO restaurantsGroupDTO);

    // 수정
    void modify(RestaurantsGroupDTO restaurantsGroupDTO);

    // 삭제
    void delete(Long groupId);

    // 그룹에 리스트 추가
    void addPlace(Long groupId, Long restaurantId);

    // 그룹에 리스트 삭제
    void deletePlace(Long restaurantId, Long groupId);
}
