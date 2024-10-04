package com.example.app.controller.admin;

import com.example.app.dto.request.NewOrRemoveRole;
import com.example.app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("AdminUserController")
@RequestMapping("/admin/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/{userId}/roles")
    public ResponseEntity<String> addRoleToUser(@PathVariable Integer userId, @Valid @RequestBody NewOrRemoveRole newRole) {
        userService.addRoleToUser(userId, newRole.role());
        return ResponseEntity.ok("Role added");
    }


    @DeleteMapping("/{userId}/roles")
    public ResponseEntity<String> removeFromUser(@PathVariable Integer userId, @Valid @RequestBody NewOrRemoveRole deleteRole) {
        userService.removeRoleFromUser(userId, deleteRole.role());
        return ResponseEntity.ok("Role delete");
    }
}
