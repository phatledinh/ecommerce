package com.phatle.ecommerce.service;

import com.phatle.ecommerce.domain.product.Attribute;
import com.phatle.ecommerce.domain.product.Category;
import com.phatle.ecommerce.domain.product.CategoryAttribute;
import com.phatle.ecommerce.dto.request.CategoryAttributeDTO;
import com.phatle.ecommerce.dto.request.CategoryDTO;
import com.phatle.ecommerce.exception.ResourceNotFoundException;
import com.phatle.ecommerce.repository.AttributeRepository;
import com.phatle.ecommerce.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final AttributeRepository attributeRepository;

    public List<CategoryDTO> getAll() {
        return categoryRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO getById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return mapToDTO(category);
    }

    @Transactional
    public CategoryDTO create(CategoryDTO dto) {
        Category category = new Category();
        mapToEntity(category, dto);

        Category savedCategory = categoryRepository.save(category);
        return mapToDTO(savedCategory);
    }

    @Transactional
    public CategoryDTO update(Long id, CategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        mapToEntity(category, dto);
        Category savedCategory = categoryRepository.save(category);
        return mapToDTO(savedCategory);
    }

    @Transactional
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found");
        }
        categoryRepository.deleteById(id);
    }

    private CategoryDTO mapToDTO(Category entity) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setSlug(entity.getSlug());
        dto.setDescription(entity.getDescription());
        dto.setThumbnail(entity.getThumbnail());
        dto.setIsActive(entity.getIsActive());
        dto.setSortOrder(entity.getSortOrder());
        if (entity.getParent() != null) {
            dto.setParentId(entity.getParent().getId());
        }

        if (entity.getCategoryAttributes() != null) {
            List<CategoryAttributeDTO> attrDtos = entity.getCategoryAttributes().stream()
                    .map(ca -> CategoryAttributeDTO.builder()
                            .attributeId(ca.getAttribute().getId())
                            .attributeName(ca.getAttribute().getName())
                            .attributeCode(ca.getAttribute().getCode())
                            .isRequired(ca.getIsRequired())
                            .isFilterable(ca.getIsFilterable())
                            .isVariant(ca.getIsVariant())
                            .sortOrder(ca.getSortOrder())
                            .build())
                    .collect(Collectors.toList());
            dto.setAttributes(attrDtos);
        }
        return dto;
    }

    private void mapToEntity(Category entity, CategoryDTO dto) {
        entity.setName(dto.getName());
        entity.setSlug(dto.getSlug());
        entity.setDescription(dto.getDescription());
        entity.setThumbnail(dto.getThumbnail());
        entity.setIsActive(dto.getIsActive());
        entity.setSortOrder(dto.getSortOrder());

        if (dto.getParentId() != null) {
            Category parent = categoryRepository.findById(dto.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent Category not found"));
            entity.setParent(parent);
        } else {
            entity.setParent(null);
        }

        if (entity.getCategoryAttributes() != null) {
            entity.getCategoryAttributes().clear();
        }

        if (dto.getAttributes() != null && !dto.getAttributes().isEmpty()) {
            for (CategoryAttributeDTO attrDto : dto.getAttributes()) {
                Attribute attribute;

                if (attrDto.getAttributeId() != null) {
                    attribute = attributeRepository.findById(attrDto.getAttributeId())
                            .orElseThrow(() -> new ResourceNotFoundException(
                                    "Attribute ID not found: " + attrDto.getAttributeId()));
                } else if (attrDto.getAttributeCode() != null) {
                    attribute = attributeRepository.findByCode(attrDto.getAttributeCode())
                            .orElseThrow(() -> new ResourceNotFoundException(
                                    "Attribute code not found: " + attrDto.getAttributeCode()));
                } else {
                    throw new IllegalArgumentException("Attribute must have id or code");
                }


                CategoryAttribute categoryAttribute = CategoryAttribute.builder()
                        .category(entity)
                        .attribute(attribute)
                        .isRequired(attrDto.getIsRequired())
                        .isFilterable(attrDto.getIsFilterable())
                        .isVariant(attrDto.getIsVariant())
                        .sortOrder(attrDto.getSortOrder() != null ? attrDto.getSortOrder() : 0)
                        .build();

                entity.getCategoryAttributes().add(categoryAttribute);
            }
        }
    }
}

