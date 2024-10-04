# Azure AD B2C Spring Boot


## Authentication in application

1. User sends a request to the application with the access token in the Authorization header

2. Verify the access token using the public key from the B2C tenant (refer to [this](#how-we-verify-the-access-token))

3. (Built-in) Spring Security will extract the JWT from the Authorization header to `Jwt` object

4. JwtAuthenticationFilter use AuthenticationManager to authenticate the user

    - `CustomAuthenticationConverter` will transform `Jwt` object to `CustomAuthenticationToken`

    - Load user from the database using the **subject** claim

    - Transform Roles to `GrantedAuthority` objects for role-based access control
   
5. Once the user is authenticated, spring security will put `CustomAuthenticationToken` to the SecurityContext 

Then, we can get the user details from the SecurityContext in the application. Through the `SecurityContextHolder.getContext().getAuthentication()` method.



## How we verify the access token

1. Fetch JWKs from the B2C tenant for public key

2. Use the public key to verify **audience**, **issuer**, and **signature**

### Using JWKs (JSON Web Key Set)

JWKs are a set of keys containing the public keys that should be used to verify any JWT issued by the B2C tenant. 
The JWKs can be fetched from the B2C tenant using the following URL:

`
https://${azure.b2c.tenant-name}.b2clogin.com/${azure.b2c.tenant-id}/discovery/v2.0/keys?p=${azure.b2c.policy-name}
`

For reasons why we use JWKs,

- The public key can be rotated without any changes in the application

- The public key can be fetched from the B2C tenant using the URL mentioned above

- The public key can be used to verify the JWT signature

Refer to [this](https://auth0.com/docs/tokens/json-web-tokens/json-web-key-set-properties) see more.