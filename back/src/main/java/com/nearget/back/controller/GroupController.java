package com.nearget.back.controller;

import com.nearget.back.dto.RestaurantDTO;
import com.nearget.back.dto.RestaurantsGroupDTO;
import com.nearget.back.service.RestaurantDataService;
import com.nearget.back.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/place")
@RequiredArgsConstructor
@Slf4j
public class GroupController {
    private final RestaurantService restaurantService;
    private final RestaurantDataService restaurantDataService;
    // 그룹 조회(그룹ID)

    // 그룹 조회(생성자EMAIL)
    @GetMapping("/groups")
    public List<RestaurantsGroupDTO> getGroupsByEmail(@RequestParam String email){
        log.info("**** GET / groups by email {} ****", email);
        return restaurantService.getGroupsByEmail(email);
    }

    // 그룹 등록
    @PostMapping("/add")
    public Map<String, String> add(RestaurantsGroupDTO restaurantsGroupDTO){
        log.info("**** POST / add {} ****", restaurantsGroupDTO);
        restaurantService.add(restaurantsGroupDTO);
        return Map.of("RESULT", "SUCCESS");
    }

    // 그룹 수정


    // 그룹 삭제
    @DeleteMapping("/delete/{groupId}")
    public Map<String, String> delete(@PathVariable Long groupId){
        log.info("**** DELETE / delete {} ****", groupId);
        restaurantService.delete(groupId);
        return Map.of("RESULT", "SUCCESS");
    }




}
