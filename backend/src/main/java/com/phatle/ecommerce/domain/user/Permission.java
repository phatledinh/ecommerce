package com.phatle.ecommerce.domain.user;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

import com.phatle.ecommerce.domain.base.BaseEntityWithoutAudit;

@Entity
@Table(name = "permissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permission extends BaseEntityWithoutAudit {
    @Column(name = "code", unique = true, nullable = false)
    private String code;
    
    @Column(nullable = false)
    private String name;
    
    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles = new HashSet<>();
}
