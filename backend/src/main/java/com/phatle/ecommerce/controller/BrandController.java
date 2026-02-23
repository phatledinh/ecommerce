package com.phatle.ecommerce.controller;

import com.phatle.ecommerce.annotation.ApiMessage;
import com.phatle.ecommerce.domain.product.Brand;
import com.phatle.ecommerce.dto.request.BrandDTO;
import com.phatle.ecommerce.dto.response.ResultPaginationDTO;
import com.phatle.ecommerce.service.BrandService;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/brands")
public class BrandController {
    private final BrandService brandService;

    @GetMapping
    @ApiMessage("Brand Retrieved Successful")
    public ResponseEntity<ResultPaginationDTO> getAllBrands(
            @RequestParam("page") Optional<Integer> page,
            @RequestParam("size") Optional<Integer> size,
            @RequestParam(value = "search", required = false) String search) { // Thêm param search

        int currentPage = page.orElse(1);
        int pageSize = size.orElse(10);
        Pageable pageable = PageRequest.of(currentPage - 1, pageSize, Sort.by("createdAt").descending());
        return ResponseEntity.ok().body(brandService.getAllBrands(search, pageable));
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete Brand Success")
    public ResponseEntity<Void> deleteBrand(@PathVariable("id") Long id) {
        brandService.deleteBrand(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{id}")
    @ApiMessage("Get Brand By Id Is Successfully")
    public ResponseEntity<BrandDTO> getBrandById(@PathVariable("id") Long id) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok().body(brandService.getBrandById(id));
    }

    @PatchMapping("/{id}/status")
    @ApiMessage("Toggle Brand Status Success")
    public ResponseEntity<Void> toggleBrandStatus(@PathVariable("id") Long id) {
        brandService.toggleStatus(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiMessage("Create Brand Success")
    public ResponseEntity<Brand> createBrand(@ModelAttribute BrandDTO dto,
                                             @RequestParam(value = "logoFile", required = false) MultipartFile file) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(brandService.createBrand(dto, file));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiMessage("Update Brand Success")
    public ResponseEntity<BrandDTO> updateBrand(@PathVariable("id") Long id,
                                                @ModelAttribute BrandDTO dto,
                                                @RequestParam(value = "logoFile", required = false) MultipartFile file) throws IOException {
        return ResponseEntity.ok().body(brandService.updateBrand(id, dto, file));
    }
}
