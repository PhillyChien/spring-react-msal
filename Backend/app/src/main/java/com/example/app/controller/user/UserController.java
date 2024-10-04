package com.example.app.controller.user;

import com.example.app.dto.CurrentUser;
import com.example.app.dto.response.UserResult;
import com.example.app.entity.UserEntity;
import com.example.app.entity.RoleEntity;
import com.example.app.model.RoleEnum;
import com.example.app.service.AuthService;
import com.example.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    public UserController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResult> getMe() {
        CurrentUser currentUser = authService.getCurrentUser();
        UserEntity userEntity = userService.getUserByEmail(currentUser.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<RoleEnum> roles = userEntity.getRoles().stream()
                .map(RoleEntity::getName)
                .collect(Collectors.toSet());
        UserResult userResult = new UserResult(userEntity.getId(), userEntity.getEmail(), roles);
        userService.activate(userEntity);
        return ResponseEntity.ok(userResult);
    }
}
