package com.example.app.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
public class CustomUserDetails extends org.springframework.security.core.userdetails.User {
    private Integer userId;
    private String email;

    public CustomUserDetails(Integer userId, String email, Collection<? extends GrantedAuthority> authorities) {
        super(email, "", authorities);
        this.userId = userId;
        this.email = email;
    }
}
