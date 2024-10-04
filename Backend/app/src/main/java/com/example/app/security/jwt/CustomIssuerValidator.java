package com.example.app.security.jwt;

import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public class CustomIssuerValidator implements OAuth2TokenValidator<Jwt> {

    private final List<String> validIssuers;

    private static final OAuth2Error error = new OAuth2Error("invalid_token", "The required issuer is invalid", null);

    public CustomIssuerValidator(List<String> validIssuers) {
        this.validIssuers = validIssuers;
    }

    @Override
    public OAuth2TokenValidatorResult validate(Jwt jwt) {
        if (validIssuers.contains(jwt.getIssuer().toString())) {
            return OAuth2TokenValidatorResult.success();
        } else {
            return OAuth2TokenValidatorResult.failure(error);
        }
    }
}
