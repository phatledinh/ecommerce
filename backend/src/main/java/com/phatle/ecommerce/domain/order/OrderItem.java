package com.phatle.ecommerce.domain.order;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

import com.phatle.ecommerce.domain.base.BaseEntityWithoutAudit;
import com.phatle.ecommerce.domain.product.Product;
import com.phatle.ecommerce.domain.product.ProductVariant;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem extends BaseEntityWithoutAudit {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant;
    
    @Column(name = "product_name", nullable = false)
    private String productName;
    
    @Column(name = "variant_name")
    private String variantName;
    
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;
    
    @Column(nullable = false)
    private Integer quantity;
}