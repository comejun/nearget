package com.nearget.back.controller;

import com.nearget.back.dto.ImageDTO;
import com.nearget.back.util.FileUtilCustom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
@Slf4j
public class ImageController {

    private final FileUtilCustom fileUtil;

    // 이미지 업로드
    @PostMapping("/upload")
    public String uploadImage(ImageDTO imageDTO) {
        log.info("************ ImageController - uploadImage -file : {}", imageDTO.getFile());
        String fileName = fileUtil.saveFile(imageDTO.getFile());
        log.info("************ ImageController - uploadImage -fileName : {}", fileName);
        return fileName;
    }

    // 이미지 조회
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable("fileName") String fileName) {
        return fileUtil.getFile(fileName);
    }

    @DeleteMapping("/delete/{fileName}")
    public Map<String, String> deleteFile(@PathVariable("fileName") String fileName) {
        log.info("************ ImageController - deleteFile -fileName : {}", fileName);
        fileUtil.deleteFile(fileName);
        return Map.of("result", "success");
    }
}
