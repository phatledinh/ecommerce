package com.phatle.ecommerce.service;

import com.phatle.ecommerce.domain.product.Brand;
import com.phatle.ecommerce.dto.request.BrandDTO;
import com.phatle.ecommerce.dto.response.ResultPaginationDTO;
import com.phatle.ecommerce.exception.ResourceNotFoundException;
import com.phatle.ecommerce.mapper.BrandMapper;
import com.phatle.ecommerce.repository.BrandRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;
    private final FileStorageService fileStorageService;

    public ResultPaginationDTO getAllBrands(String keyword, Pageable pageable) {
        Page<Brand> pageResult = brandRepository.searchBrands(keyword, pageable);

        ResultPaginationDTO.Meta meta = ResultPaginationDTO.Meta.builder()
                .page(pageable.getPageNumber() + 1)
                .pageSize(pageable.getPageSize())
                .pages(pageResult.getTotalPages())
                .total(pageResult.getTotalElements())
                .build();
        return new ResultPaginationDTO(meta, BrandMapper.toListDTO(pageResult.getContent()));
    }

    public Brand createBrand(BrandDTO dto, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            String logo = fileStorageService.storeFile(file, "brands");
            dto.setLogo(logo);
        }
        return brandRepository.save(BrandMapper.toEntity(dto));
    }

    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }

    public BrandDTO getBrandById(Long id) throws ChangeSetPersister.NotFoundException {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy Brand voi id: " + id));
        return BrandMapper.EntityToDTO(brand);
    }

    public BrandDTO updateBrand(Long id, BrandDTO dto, MultipartFile file) throws IOException {
        if(file != null && !file.isEmpty()) {
            String logo = fileStorageService.storeFile(file, "brands");
            dto.setLogo(logo);
        }
        brandRepository.save(BrandMapper.toEntity(dto));
        return dto;
    }

    public void deleteBrandById(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy Brand voi id: " + id));
        if(brand != null) {
            brandRepository.deleteById(brand.getId());
        }
    }

    @Transactional
    public void toggleStatus(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found: " + id));
        brand.setIsActive(!brand.getIsActive());
        brandRepository.save(brand);
    }
}