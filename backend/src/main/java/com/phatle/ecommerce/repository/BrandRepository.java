package com.phatle.ecommerce.repository;

import com.phatle.ecommerce.domain.product.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    Brand findBySlug(String slug);

    @Query("SELECT b FROM Brand b WHERE " +
            "(:keyword IS NULL OR :keyword = '' OR " +
            "LOWER(b.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(b.slug) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Brand> searchBrands(String keyword, Pageable pageable);

    boolean existsByName(String name);
}
