package com.phatle.ecommerce.repository;

import com.phatle.ecommerce.domain.product.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute, Long> {
    boolean existsByCode(String code);
}
