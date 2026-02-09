package com.phatle.ecommerce.controller;

import com.phatle.ecommerce.dto.AttributeDTO;
import com.phatle.ecommerce.service.AttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/attributes")
@RequiredArgsConstructor
public class AttributeController {

    private final AttributeService attributeService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PRODUCT_MANAGER')")
    public ResponseEntity<List<AttributeDTO>> getAllAttributes() {
        return ResponseEntity.ok(attributeService.getAllAttributes());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PRODUCT_MANAGER')")
    public ResponseEntity<AttributeDTO> getAttributeById(@PathVariable Long id) {
        return ResponseEntity.ok(attributeService.getAttributeById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PRODUCT_MANAGER')")
    public ResponseEntity<AttributeDTO> createAttribute(@RequestBody AttributeDTO dto) {
        return ResponseEntity.ok(attributeService.createAttribute(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PRODUCT_MANAGER')")
    public ResponseEntity<AttributeDTO> updateAttribute(@PathVariable Long id, @RequestBody AttributeDTO dto) {
        return ResponseEntity.ok(attributeService.updateAttribute(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PRODUCT_MANAGER')")
    public ResponseEntity<Void> deleteAttribute(@PathVariable Long id) {
        attributeService.deleteAttribute(id);
        return ResponseEntity.noContent().build();
    }
}