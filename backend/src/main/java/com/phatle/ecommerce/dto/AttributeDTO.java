package com.phatle.ecommerce.dto;


import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttributeDTO {
    private Long id;
    private String code;
    private String name;
    private String dataType;
    private String inputType;
    private String unit;
    private Boolean isRequired;
    private Boolean isVariant;
    private Boolean isFilterable;
    private List<AttributeOptionDTO> options;
}
