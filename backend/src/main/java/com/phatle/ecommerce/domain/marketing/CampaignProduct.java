package com.phatle.ecommerce.domain.marketing;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

import com.phatle.ecommerce.domain.base.BaseEntityWithoutAudit;
import com.phatle.ecommerce.domain.product.Product;
import com.phatle.ecommerce.domain.product.ProductVariant;

@Entity
@Table(name = "campaign_products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampaignProduct extends BaseEntityWithoutAudit {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id")
    private ProductVariant variant;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "discount_type", nullable = false)
    private CampaignDiscountType discountType;
    
    @Column(name = "discount_value", nullable = false, precision = 15, scale = 2)
    private BigDecimal discountValue;
    
    @Column(name = "quantity_limit")
    private Integer quantityLimit;
    
    @Column(name = "sold_quantity")
    private Integer soldQuantity = 0;
}


