package com.phatle.ecommerce.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
public class BrandDTO {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String logo;
    private Boolean isActive;
}
