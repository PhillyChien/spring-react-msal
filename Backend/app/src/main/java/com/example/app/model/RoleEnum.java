package com.example.app.model;

import lombok.Getter;

@Getter
public enum RoleEnum {
    GUEST("GUEST"),
    USER("USER"),
    ADMIN("ADMIN"),
    SUPER_ADMIN("SUPER_ADMIN");

    private final String name;

    RoleEnum(String name) {
        this.name = name;
    }
}
