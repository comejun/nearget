package com.nearget.back.util;

import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
@Slf4j
public class FileUtilCustom {

    @Value("${nearget.upload.path}")
    private String uploadPath;

    @PostConstruct
    public void init() {
        // 실제 파일 저장할 폴더 생성
        // File 객체 생성
        File folder = new File(uploadPath);
        // 폴더 존재 여부 체크 후 생성
        if (!folder.exists()) {
            folder.mkdirs();
        }

    }

    // 파일 저장 처리 메서드
    public String saveFile(MultipartFile file) {
        // 파일이 null 이면
        if (file == null) {
            return null;
        }

        // 파일의 MIME 타입을 확인하고, 이미지 파일이 아닌 경우 null을 반환
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image")) {
            return null;
        }

        // 파일 이름 중복 처리
        String uuid = UUID.randomUUID().toString();
        // 확장자명 추출
        String originalFilename = file.getOriginalFilename();
        int idx = originalFilename.lastIndexOf(".");
        String ext = originalFilename.substring(idx);
        // 저장할 파일명 변경
        String saveName = uuid + ext;
        // 저장 경로 + 저장 파일명
        Path savePath = Paths.get(uploadPath, saveName); // 파일경로/파일명 형태로 만들어 리턴

        try {
            // 파일 복사 == 저장
            Files.copy(file.getInputStream(), savePath);

            // 썸네일 생성 코드 추가 (원본파일 저장 후 처리)
            Path thumbnailPath = Paths.get(uploadPath, "th_" + saveName);
            Thumbnails.of(savePath.toFile()) // 원본파일지정
                    .size(200, 200) // 썸네일이미지 사이즈 지정
                    .toFile(thumbnailPath.toFile()); // 썸네일로 저장할 File 객체

            return saveName; // 저장된 파일명을 반환
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // 파일 브라우저에 보여주기 위한 메서드 : 저장된 파일명 매개값으로 받기
    public ResponseEntity<Resource> getFile(String fileName) {
        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);
        HttpHeaders headers = new HttpHeaders();

        try {
            headers.add("Content-Type",
                    Files.probeContentType(resource.getFile().toPath()));
        } catch (IOException e) {

            return ResponseEntity.internalServerError().build();
        }

        // 성공 + header정보 + resource 데이터 리턴
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    // 파일 삭제 기능
    public void deleteFile(String fileName) {
        // 파일이 없으면 강제 종료
        if (fileName == null || fileName.isEmpty()) {
            return;
        }

        // 썸네일+원본파일 존재여부 확인후 삭제
        String thumbnailFileName = "th_" + fileName;
        Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
        Path filePath = Paths.get(uploadPath, fileName);
        try {
            Files.deleteIfExists(filePath);
            Files.deleteIfExists(thumbnailPath);
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }


}
