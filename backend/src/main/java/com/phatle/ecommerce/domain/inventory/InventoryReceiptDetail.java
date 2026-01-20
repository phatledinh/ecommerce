package com.phatle.ecommerce.domain.inventory;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

import com.phatle.ecommerce.domain.base.BaseEntityWithoutAudit;
import com.phatle.ecommerce.domain.product.ProductVariant;

@Entity
@Table(name = "inventory_receipt_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryReceiptDetail extends BaseEntityWithoutAudit {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receipt_id", nullable = false)
    private InventoryReceipt receipt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_variant_id", nullable = false)
    private ProductVariant productVariant;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(name = "import_price", nullable = false, precision = 15, scale = 2)
    private BigDecimal importPrice;
}