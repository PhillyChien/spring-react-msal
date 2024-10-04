package com.example.app.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "azure.b2c")
public class AzureB2CProperties {

    private String tenantName;
    private String tenantId;
    private String clientId;
    private String jwkSetUri;
    private List<String> validIssuers;

    // Getter and Setter methods

    public String getTenantName() {
        return tenantName;
    }

    public void setTenantName(String tenantName) {
        this.tenantName = tenantName;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getJwkSetUri() {
        return jwkSetUri;
    }

    public void setJwkSetUri(String jwkSetUri) {
        this.jwkSetUri = jwkSetUri;
    }

    public List<String> getValidIssuers() {
        return validIssuers;
    }

    public void setValidIssuers(List<String> validIssuers) {
        this.validIssuers = validIssuers;
    }
}
