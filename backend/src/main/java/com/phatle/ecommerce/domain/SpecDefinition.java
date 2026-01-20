package com.phatle.ecommerce.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "spec_definitions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecDefinition extends BaseEntity {
    @OneToOne
    @JoinColumn(name = "attribute_id", nullable = false, unique = true)
    private Attribute attribute;
    
    private String icon;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}
