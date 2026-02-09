package com.phatle.ecommerce.service;

import com.phatle.ecommerce.domain.product.Attribute;
import com.phatle.ecommerce.domain.product.AttributeOption;
import com.phatle.ecommerce.dto.AttributeDTO;
import com.phatle.ecommerce.dto.AttributeOptionDTO;
import com.phatle.ecommerce.exception.BadRequestException;
import com.phatle.ecommerce.exception.ResourceNotFoundException;
import com.phatle.ecommerce.repository.AttributeRepository;
import com.phatle.ecommerce.repository.ProductAttributeValueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttributeService {

    private final AttributeRepository attributeRepository;
    private final ProductAttributeValueRepository productAttributeValueRepository;

    public List<AttributeDTO> getAllAttributes() {
        return attributeRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AttributeDTO getAttributeById(Long id) {
        Attribute attr = attributeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thuộc tính với ID: " + id));
        return mapToDTO(attr);
    }

    @Transactional
    public AttributeDTO createAttribute(AttributeDTO dto) {
        if (attributeRepository.existsByCode(dto.getCode())) {
            throw new BadRequestException("Mã thuộc tính (Code) đã tồn tại: " + dto.getCode());
        }

        Attribute attribute = Attribute.builder()
                .code(dto.getCode())
                .name(dto.getName())
                .dataType(dto.getDataType())
                .inputType(dto.getInputType())
                .unit(dto.getUnit())
                .isRequired(dto.getIsRequired())
                .isVariant(dto.getIsVariant())
                .isFilterable(dto.getIsFilterable())
                .options(new ArrayList<>())
                .build();

        if (dto.getOptions() != null) {
            for (AttributeOptionDTO optDto : dto.getOptions()) {
                AttributeOption opt = mapOptionToEntity(optDto);
                attribute.addOption(opt);
            }
        }

        return mapToDTO(attributeRepository.save(attribute));
    }

    @Transactional
    public AttributeDTO updateAttribute(Long id, AttributeDTO dto) {
        Attribute existingAttr = attributeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thuộc tính"));

        existingAttr.setName(dto.getName());
        existingAttr.setUnit(dto.getUnit());
        existingAttr.setIsRequired(dto.getIsRequired());
        existingAttr.setIsVariant(dto.getIsVariant());
        existingAttr.setIsFilterable(dto.getIsFilterable());

        if (dto.getOptions() != null) {
            updateOptions(existingAttr, dto.getOptions());
        }

        return mapToDTO(attributeRepository.save(existingAttr));
    }

    private void updateOptions(Attribute attribute, List<AttributeOptionDTO> optionDTOs) {
        List<Long> dtoIds = optionDTOs.stream()
                .map(AttributeOptionDTO::getId)
                .filter(id -> id != null)
                .collect(Collectors.toList());

        attribute.getOptions().removeIf(opt -> {
            boolean shouldDelete = opt.getId() != null && !dtoIds.contains(opt.getId());
            if (shouldDelete) {
                opt.setAttribute(null);
            }
            return shouldDelete;
        });

        for (AttributeOptionDTO optDto : optionDTOs) {
            if (optDto.getId() == null) {
                AttributeOption newOpt = mapOptionToEntity(optDto);
                attribute.addOption(newOpt);
            } else {
                attribute.getOptions().stream()
                        .filter(o -> o.getId().equals(optDto.getId()))
                        .findFirst()
                        .ifPresent(existingOpt -> {
                            existingOpt.setDisplayName(optDto.getDisplayName());
                            existingOpt.setValue(optDto.getValue());
                            existingOpt.setSortOrder(optDto.getSortOrder());
                        });
            }
        }
    }

    @Transactional
    public void deleteAttribute(Long id) {
        if (!attributeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Thuộc tính không tồn tại");
        }


        boolean isUsed = productAttributeValueRepository.existsByAttributeId(id);
        if (isUsed) {
            throw new BadRequestException("Không thể xóa thuộc tính đang được sử dụng bởi sản phẩm.");
        }

        attributeRepository.deleteById(id);
    }

    private AttributeDTO mapToDTO(Attribute entity) {
        AttributeDTO dto = new AttributeDTO();
        dto.setId(entity.getId());
        dto.setCode(entity.getCode());
        dto.setName(entity.getName());
        dto.setDataType(entity.getDataType());
        dto.setInputType(entity.getInputType());
        dto.setUnit(entity.getUnit());
        dto.setIsRequired(entity.getIsRequired());
        dto.setIsVariant(entity.getIsVariant());
        dto.setIsFilterable(entity.getIsFilterable());

        if (entity.getOptions() != null) {
            dto.setOptions(entity.getOptions().stream().map(opt -> {
                AttributeOptionDTO optDto = new AttributeOptionDTO();
                optDto.setId(opt.getId());
                optDto.setDisplayName(opt.getDisplayName());
                optDto.setValue(opt.getValue());
                optDto.setSortOrder(opt.getSortOrder());
                return optDto;
            }).collect(Collectors.toList()));
        }
        return dto;
    }

    private AttributeOption mapOptionToEntity(AttributeOptionDTO dto) {
        return AttributeOption.builder()
                .displayName(dto.getDisplayName())
                .value(dto.getValue())
                .sortOrder(dto.getSortOrder())
                .build();
    }
}