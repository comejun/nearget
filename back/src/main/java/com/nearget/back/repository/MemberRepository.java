package com.nearget.back.repository;

import com.nearget.back.domain.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, String> {
    // 회원 조회 + 권한 목록 포함
    // select 한번만 하기 위해 @EntityGraph 사용
    @EntityGraph(attributePaths = {"roleList"})
    @Query("select m from Member m where m.email = :email")
    Member getMemberWithRoles(@Param("email") String email);

}
