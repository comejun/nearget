package com.nearget.back.controller;

import com.nearget.back.domain.Category;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@ToString
@RestController
@RequestMapping("/api")
public class CategoryController {

    @GetMapping("/categories")
    public Map<String, String> getCategoryMap() {
        Map<String, String> categoryMap = new HashMap<>();
        for (Category category : Category.values()) {
            categoryMap.put(category.name(), category.getValue());
        }
        return categoryMap;
    }
}



