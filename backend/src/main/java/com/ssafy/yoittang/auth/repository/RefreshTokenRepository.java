package com.ssafy.yoittang.auth.repository;

import org.springframework.data.repository.CrudRepository;

import com.ssafy.yoittang.auth.domain.RefreshToken;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}
