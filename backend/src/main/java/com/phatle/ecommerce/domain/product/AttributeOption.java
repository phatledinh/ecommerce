package com.phatle.ecommerce.domain.product;

import com.phatle.ecommerce.domain.base.BaseEntityWithoutAudit;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "attribute_options")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttributeOption extends BaseEntityWithoutAudit {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attribute_id", nullable = false)
    private Attribute attribute;
    
    @Column(nullable = false)
    private String value;
    
    @Column(name = "display_name")
    private String displayName;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}
