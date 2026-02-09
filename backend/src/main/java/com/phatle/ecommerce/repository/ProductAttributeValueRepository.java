package com.phatle.ecommerce.repository;

import com.phatle.ecommerce.domain.product.ProductAttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductAttributeValueRepository extends JpaRepository<ProductAttributeValue, Long> {
    boolean existsByAttributeId(Long id);
}
