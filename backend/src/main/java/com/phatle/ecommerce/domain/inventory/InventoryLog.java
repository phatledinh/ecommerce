package com.phatle.ecommerce.domain.inventory;

import com.phatle.ecommerce.domain.base.BaseEntityWithoutAudit;
import com.phatle.ecommerce.domain.product.ProductVariant;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "inventory_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryLog extends BaseEntityWithoutAudit {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_variant_id", nullable = false)
    private ProductVariant productVariant;
    
    @Column(name = "change_quantity", nullable = false)
    private Integer changeQuantity;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "action_type", nullable = false)
    private ActionType actionType;
    
    @Column(name = "reference_id")
    private Long referenceId;
    
}

