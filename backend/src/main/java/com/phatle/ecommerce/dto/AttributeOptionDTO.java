package com.phatle.ecommerce.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttributeOptionDTO {
    private Long id;
    private String value;
    private String displayName;
    private Integer sortOrder;
}
