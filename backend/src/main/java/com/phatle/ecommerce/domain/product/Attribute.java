package com.phatle.ecommerce.domain.product;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

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
    @Builder.Default
    private Boolean isFilterable = false;

    @Column(name = "is_variant")
    @Builder.Default
    private Boolean isVariant = false;

    @Column(name = "is_required")
    @Builder.Default
    private Boolean isRequired = false;

    private String unit;

    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<AttributeOption> options = new ArrayList<>();

    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL)
    @Builder.Default
    private List<CategoryAttribute> categoryAttributes = new ArrayList<>();

    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL)
    @Builder.Default
    private List<ProductAttributeValue> productAttributeValues = new ArrayList<>();

    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL)
    @Builder.Default
    private List<ProductSpec> productSpecs = new ArrayList<>();

    @OneToOne(mappedBy = "attribute", cascade = CascadeType.ALL)
    private SpecDefinition specDefinition;

    //    HELPER METHODS
    public void addOption(AttributeOption option) {
        options.add(option);
        option.setAttribute(this);
    }

    public void removeOption(AttributeOption option) {
        options.remove(option);
        option.setAttribute(null);
    }
}