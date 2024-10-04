package com.example.app.service;

import com.example.app.entity.RoleEntity;
import com.example.app.entity.UserEntity;
import com.example.app.model.RoleEnum;
import com.example.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    private final RoleService roleService;

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository, RoleService roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    public Optional<UserEntity> getUserBySubject(String subject) {
        return userRepository.findBySubject(subject);
    }

    public Optional<UserEntity> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public Optional<UserEntity> createDefaultUser(String subject, String email) {
        Optional<UserEntity> userOptional = getUserBySubject(subject);
        if (userOptional.isPresent()) {
            return Optional.empty();
        }

        UserEntity user = new UserEntity();
        user.setSubject(subject);
        user.setEmail(email);
        user.setRoles(Set.of(roleService.getRoleByName(RoleEnum.USER)));
        return Optional.of(userRepository.save(user));
    }

    public boolean addRoleByEmail(String email, RoleEnum role) {
        Optional<UserEntity> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return false;
        }

        UserEntity user = userOptional.get();
        return addRole(user, role);
    }

    public boolean addRoleToUser(Integer userId, RoleEnum role) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return false;
        }

        UserEntity user = userOptional.get();
        return addRole(user, role);
    }

    public boolean removeRoleFromUser(Integer userId, RoleEnum role) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return false;
        }

        UserEntity user = userOptional.get();
        RoleEntity roleEntity = roleService.getRoleByName(role);
        if(user.getRoles().remove(roleEntity)) {
            userRepository.save(user);
            return true;
        }else {
            return false;
        }
    }

    private boolean addRole(UserEntity user, RoleEnum role) {
        RoleEntity roleEntity = roleService.getRoleByName(role);
        if(user.getRoles().add(roleEntity)) {
            userRepository.save(user);
            return true;
        }else {
            return false;
        }
    }

    public boolean activate(UserEntity user) {
        user.activate();
        userRepository.save(user);
        return true;
    }

}
