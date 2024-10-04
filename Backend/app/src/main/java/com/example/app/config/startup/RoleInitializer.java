package com.example.app.config.startup;

import com.example.app.model.RoleEnum;
import com.example.app.service.RoleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RoleInitializer implements CommandLineRunner {
    private final RoleService roleService;

    public RoleInitializer(RoleService roleService) {
        this.roleService = roleService;
    }

    @Override
    public void run(String... args) {
        roleService.createRoleIfNotExists(RoleEnum.GUEST);
        roleService.createRoleIfNotExists(RoleEnum.USER);
        roleService.createRoleIfNotExists(RoleEnum.ADMIN);
        roleService.createRoleIfNotExists(RoleEnum.SUPER_ADMIN);
    }

}
