package com.nearget.back;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.concurrent.CountDownLatch;

@SpringBootTest
class BackApplicationTests {

    @Test
    void contextLoads() {

    }

    @Test
    void hello3() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        WebClient client = WebClient.create("http://openapi.seoul.go.kr:8088/7050644859636f6d37316173754544/json/LOCALDATA_072404");
        client.get()
                .uri("/{start}/{end}",1,100)
                .retrieve()
                // json 형태로 받아오기
                .bodyToMono(String.class)
                .subscribe(body -> {
                    // body에는 json 형태로 받아온 데이터 추출하기

                    // Gson 객체 생성
                    Gson gson = new Gson();

                    // JSON 문자열을 Java 객체로 변환
                    LocalData localData = gson.fromJson(body, LocalData.class);

                    for (BusinessInfo businessInfo : localData.LOCALDATA_072404.row) {
                        System.out.println("--------------------");
                        System.out.println("관리번호: " + businessInfo.MGTNO);
                        System.out.println("업소명: " + businessInfo.BPLCNM);
                        System.out.println("소재지 전체 주소: " + businessInfo.SITEWHLADDR);
                        System.out.println("영업상태구분: " + businessInfo.TRDSTATEGBN);
                        System.out.println("영업상태명: " + businessInfo.TRDSTATENM);
                        System.out.println("업태명: " + businessInfo.UPTAENM);
                        System.out.println("--------------------");
                    }

                    latch.countDown();
                });

        System.out.println("main finish");
        latch.await();


    }
    static class LocalData {
        LocalData_072404 LOCALDATA_072404;
    }

    static class LocalData_072404 {
        List<BusinessInfo> row;
    }

    static class BusinessInfo {
        String BPLCNM; // 업소명
        String SITEWHLADDR; // 소재지 전체 주소
        String TRDSTATEGBN; // 영업상태구분
        String TRDSTATENM; // 영업상태명
        String UPTAENM; // 업태명
        String MGTNO; // 관리번호
    }

}
