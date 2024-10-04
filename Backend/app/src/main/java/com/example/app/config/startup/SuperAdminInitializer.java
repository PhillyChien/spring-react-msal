package com.example.app.config.startup;

import com.example.app.model.RoleEnum;
import com.example.app.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SuperAdminInitializer implements CommandLineRunner {
    private final UserService userService;

    public SuperAdminInitializer(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) {
        userService.addRoleByEmail("chienaeae@gmail.com", RoleEnum.SUPER_ADMIN);
    }

}
