package com.phatle.ecommerce.mapper;

import com.phatle.ecommerce.dto.request.BrandDTO;
import com.phatle.ecommerce.domain.product.Brand;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

public class BrandMapper {
    public static BrandDTO EntityToDTO(Brand brand) {
        return BrandDTO.builder()
                .id(brand.getId())
                .name(brand.getName())
                .slug(brand.getSlug())
                .logo(brand.getLogo())
                .isActive(brand.getIsActive())
                .build();
    }

    public static List<BrandDTO> toListDTO(List<Brand> brands) {
        List<BrandDTO> list = new ArrayList<>();
        for (Brand brand : brands) {
            list.add(EntityToDTO(brand));
        }
        return list;
    }

    public static Brand toEntity(BrandDTO brandDTO) {
        return Brand.builder()
                .name(brandDTO.getName())
                .slug(brandDTO.getSlug())
                .description(brandDTO.getDescription())
                .logo(brandDTO.getLogo())
                .isActive(brandDTO.getIsActive())
                .build();
    }
}
