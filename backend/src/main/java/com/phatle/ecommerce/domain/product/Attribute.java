package com.phatle.ecommerce.domain.product;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

import com.phatle.ecommerce.domain.base.BaseEntity;

@Entity
@Table(name = "attributes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attribute extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String code;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "data_type", nullable = false)
    private String dataType;
    
    @Column(name = "input_type", nullable = false)
    private String inputType;
    
    @Column(name = "is_filterable")
    private Boolean isFilterable = false;
    
    @Column(name = "is_variant")
    private Boolean isVariant = false;
    
    @Column(name = "is_required")
    private Boolean isRequired = false;
    
    private String unit;
    
    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL)
    private Set<AttributeOption> options = new HashSet<>();
    
    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL)
    private Set<CategoryAttribute> categoryAttributes = new HashSet<>();
    
    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL)
    private Set<ProductAttributeValue> productAttributeValues = new HashSet<>();
    
    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL)
    private Set<ProductSpec> productSpecs = new HashSet<>();
    
    @OneToOne(mappedBy = "attribute", cascade = CascadeType.ALL)
    private SpecDefinition specDefinition;
}
