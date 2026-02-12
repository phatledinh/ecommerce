package com.phatle.ecommerce.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryAttributeDTO {
    private Long attributeId;
    private String attributeName;
    private String attributeCode;
    private Boolean isRequired;
    private Boolean isFilterable;
    private Boolean isVariant;
    private Integer sortOrder;
}
