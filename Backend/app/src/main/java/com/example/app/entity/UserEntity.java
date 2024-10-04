package com.example.app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(
    name = "users",
    indexes = {
            @Index(name = "idx_email", columnList = "email"),
            @Index(name = "idx_subject", columnList = "subject")
    }
)
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String subject;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<RoleEntity> roles = new HashSet<>();

    public LocalDateTime createdAt;

    public LocalDateTime lastActivatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now(ZoneOffset.UTC);
    }

    public void activate() {
        lastActivatedAt = LocalDateTime.now(ZoneOffset.UTC);
    }

}
