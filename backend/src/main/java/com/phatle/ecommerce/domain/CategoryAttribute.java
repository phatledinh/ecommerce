package com.phatle.ecommerce.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "category_attributes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryAttribute extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attribute_id", nullable = false)
    private Attribute attribute;
    
    @Column(name = "is_required")
    private Boolean isRequired = false;
    
    @Column(name = "is_filterable")
    private Boolean isFilterable = false;
    
    @Column(name = "is_variant")
    private Boolean isVariant = false;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}
