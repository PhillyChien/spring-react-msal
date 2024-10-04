package com.example.app.repository;

import com.example.app.entity.RoleEntity;
import com.example.app.model.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity, Integer> {
    Optional<RoleEntity> findByName(RoleEnum name);
}
