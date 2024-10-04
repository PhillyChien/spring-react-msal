package com.example.app.dto.request;

import com.example.app.model.RoleEnum;
import jakarta.validation.constraints.NotNull;


public record NewOrRemoveRole(
        @NotNull(message = "role is required")
        RoleEnum role
) {
}
