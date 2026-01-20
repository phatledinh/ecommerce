package com.phatle.ecommerce.domain.product;

import com.phatle.ecommerce.domain.base.BaseEntityWithoutAudit;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "spec_definitions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecDefinition extends BaseEntityWithoutAudit {
    @OneToOne
    @JoinColumn(name = "attribute_id", nullable = false, unique = true)
    private Attribute attribute;
    
    private String icon;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}
