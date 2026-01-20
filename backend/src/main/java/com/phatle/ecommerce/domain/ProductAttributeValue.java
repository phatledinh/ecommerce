package com.phatle.ecommerce.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_attribute_values")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAttributeValue extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attribute_id", nullable = false)
    private Attribute attribute;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attribute_option_id")
    private AttributeOption attributeOption;
    
    @Column(name = "value_text", columnDefinition = "TEXT")
    private String valueText;
}
