package com.example.app.service;

import com.example.app.entity.RoleEntity;
import com.example.app.model.RoleEnum;
import com.example.app.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void createRoleIfNotExists(RoleEnum name) {
        if (roleRepository.findByName(name).isEmpty()) {
            RoleEntity role = new RoleEntity();
            role.setName(name);
            roleRepository.save(role);
        }
    }

    public RoleEntity getRoleByName(RoleEnum name) {
        return roleRepository.findByName(name).orElseThrow(
                () -> new RuntimeException("Role not found")
        );
    }
}
