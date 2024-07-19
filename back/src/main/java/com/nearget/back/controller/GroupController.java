package com.nearget.back.controller;

import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.dto.RestaurantsGroupDTO;
import com.nearget.back.service.GroupService;
import com.nearget.back.service.RestaurantDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
@Slf4j
public class GroupController {
    private final GroupService groupService;
    private final RestaurantDataService restaurantDataService;

    // 그룹 조회(그룹ID)
    @GetMapping("/group/{groupId}")
    public RestaurantsGroupDTO getGroupById(@PathVariable Long groupId){
        log.info("**** GET / group by id {} ****", groupId);
        return groupService.getGroupById(groupId);
    }

    // 그룹 조회(생성자EMAIL)
    @GetMapping("/groups")
    public List<RestaurantsGroupDTO> getGroupsByEmail(@RequestParam String email){
        log.info("**** GET / groups by email {} ****", email);
        return groupService.getGroupsByEmail(email);
    }

    // 그룹 안의 리스트 조회
    @GetMapping("/group/{groupId}/list")
    public List<RestaurantDTO> getGroupList(@PathVariable Long groupId){
        log.info("**** GET / groupsList by id {} ****", groupId);
        List<RestaurantDTO> groupList = groupService.getGroupList(groupId);
        return groupList;
    }

    // 그룹 등록
    @PostMapping("/add")
    public Map<String, String> add(RestaurantsGroupDTO restaurantsGroupDTO){
        log.info("**** POST / add {} ****", restaurantsGroupDTO);
        groupService.add(restaurantsGroupDTO);
        return Map.of("RESULT", "SUCCESS");
    }

    // 그룹 수정
    @PostMapping("/edit")
    public ResponseEntity<?> edit(RestaurantsGroupDTO restaurantsGroupDTO){
        log.info("**** POST / edit {} ****", restaurantsGroupDTO);
        try {
            groupService.edit(restaurantsGroupDTO);
            return ResponseEntity.ok("Group edited successfully");
        } catch (Exception e) {
            log.error("Error editing group", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error editing group");
        }
    }

    // 그룹 삭제
    @DeleteMapping("/delete/{groupId}")
    public Map<String, String> delete(@PathVariable Long groupId){
        log.info("**** DELETE / delete {} ****", groupId);
        groupService.delete(groupId);
        return Map.of("RESULT", "SUCCESS");
    }

    // 그룹에 식당 추가
    @PostMapping("/groups/{adddata}")
    public ResponseEntity<?> addRestaurantToGroup(@RequestBody Map<String, Long> payload) {
        Long restaurantId = payload.get("restaurantId");
        Long groupId = payload.get("groupId");
        try {
            groupService.addPlace(groupId, restaurantId);
            return ResponseEntity.ok("Restaurant added to group");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding restaurant to group");
        }
    }

    @DeleteMapping("/groups/{groupId}/restaurants")
    public ResponseEntity<?> deleteRestaurantToGroup(@PathVariable Long groupId, @RequestBody Map<String, Long> payload) {
        Long restaurantId = payload.get("restaurantId");
        try {
            groupService.deletePlace(restaurantId, groupId);
            return ResponseEntity.ok("Restaurant added to group");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding restaurant to group");
        }
    }
}
