package com.phatle.ecommerce.dto.request;


import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
    private Long parentId;
    private Integer sortOrder;
    private Boolean isActive;

    private List<CategoryAttributeDTO> attributes = new ArrayList<>();
}