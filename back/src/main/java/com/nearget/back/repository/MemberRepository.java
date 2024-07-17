package com.nearget.back.repository;

import com.nearget.back.domain.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    // 회원 조회 + 권한 목록 포함
    // select 한번만 하기 위해 @EntityGraph 사용
    @EntityGraph(attributePaths = {"roleList"})
    @Query("select m from Member m where m.email = :email")
    Member getMemberWithRoles(@Param("email") String email);

    // 회원 이메일
    Optional<Member> findByEmail(String email);

    // 전체 회원으ㅢ member_like_restaurant_list 테이블에서 레스토랑 id의 개수를 조회
    @Query("SELECT COUNT(m) FROM Member m JOIN m.likeRestaurantList l WHERE l = :restaurantId")
    int countByRestaurantId(@Param("restaurantId") Long restaurantId);

    // 회원의 좋아요 레스토랑 포함 조회
    @EntityGraph(attributePaths = {"likeRestaurantList"})
    Optional<Member> findWithLikeRestaurantListByEmail(String email);


}
