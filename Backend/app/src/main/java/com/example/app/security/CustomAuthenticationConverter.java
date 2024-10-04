package com.example.app.security;

import com.example.app.service.UserService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.ArrayList;

public class CustomAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    private final CustomUserDetailsService userDetailsService;
    private final UserService userService;

    public CustomAuthenticationConverter(CustomUserDetailsService userDetailsService, UserService userService) {
        this.userDetailsService = userDetailsService;
        this.userService = userService;
    }

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) throws UsernameNotFoundException {
        String subject = jwt.getSubject();
        String email = jwt.getClaimAsStringList("emails").get(0);

        System.out.println("subject: " + subject);
        System.out.println("email: " + email);

        UserDetails userDetails;

        try {
            userDetails = userDetailsService.loadUserByUsername(subject);
        } catch (UsernameNotFoundException e) {
            System.out.println("User not found, creating a new user");
            synchronized (UserService.class) {
                // If the user does not exist, create a new user
                userDetails = userService.createDefaultUser(subject, email)
                        .map(userDetailsService::loadToCustomUserDetails)
                        .orElseThrow(() -> new UsernameNotFoundException("user initialized failed"));
            }
        }

        return new CustomAuthenticationToken(userDetails, jwt, new ArrayList<>(userDetails.getAuthorities()));
    }
}
