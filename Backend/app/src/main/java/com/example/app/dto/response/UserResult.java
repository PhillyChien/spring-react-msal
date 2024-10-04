package com.example.app.dto.response;

import com.example.app.model.RoleEnum;

import java.util.Set;

public record UserResult(
        Integer id,
        String email,
        Set<RoleEnum> roles
){
}
