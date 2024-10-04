package com.example.app.config;

import com.example.app.model.RoleEnum;
import com.example.app.security.CustomUserDetailsService;
import com.example.app.security.jwt.AudienceValidator;
import com.example.app.security.CustomAuthenticationConverter;
import com.example.app.security.jwt.CustomIssuerValidator;
import com.example.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig  {

    @Autowired
    private AzureB2CProperties azureB2CProperties;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(azureB2CProperties.getJwkSetUri())
                .build();

        OAuth2TokenValidator<Jwt> withAudience = new AudienceValidator(azureB2CProperties.getClientId());
        OAuth2TokenValidator<Jwt> withIssuer = new CustomIssuerValidator(azureB2CProperties.getValidIssuers());
        OAuth2TokenValidator<Jwt> validator = new DelegatingOAuth2TokenValidator<>(withAudience, withIssuer);

        jwtDecoder.setJwtValidator(validator);

        return jwtDecoder;
    }

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authorize -> authorize
                    .requestMatchers("/user/**").hasRole(RoleEnum.USER.name())
                    .requestMatchers("/admin/**").hasAnyRole(RoleEnum.ADMIN.name(), RoleEnum.SUPER_ADMIN.name())
                    .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(new CustomAuthenticationConverter(userDetailsService, userService)))
                );
        return http.build();
    }
}
