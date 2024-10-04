package com.example.app.security;

import com.example.app.entity.RoleEntity;
import com.example.app.entity.UserEntity;
import com.example.app.service.UserService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService userService;

    public CustomUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String subject) {
        UserEntity user = userService.getUserBySubject(subject)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found"
                ));

        return loadToCustomUserDetails(user);
    }

    public CustomUserDetails loadToCustomUserDetails(UserEntity user) {
        return new CustomUserDetails(
                user.getId(),
                user.getEmail(),
                mapRolesToAuthorities(user.getRoles())
        );
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Set<RoleEntity> roles) {
        List<GrantedAuthority> rs = new ArrayList<>();
        for (RoleEntity role : roles) {
            rs.add(new SimpleGrantedAuthority("ROLE_" + role.getName().name()));
        }
        return rs;
    }
}
