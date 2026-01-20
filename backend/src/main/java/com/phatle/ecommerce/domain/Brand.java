package com.phatle.ecommerce.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "brands")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Brand extends BaseEntity {
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String slug;
    
    private String logo;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL)
    private Set<Product> products = new HashSet<>();
}
