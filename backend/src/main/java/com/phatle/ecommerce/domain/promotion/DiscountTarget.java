package com.phatle.ecommerce.domain.promotion;

import com.phatle.ecommerce.domain.base.BaseEntityWithoutAudit;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "discount_targets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiscountTarget extends BaseEntityWithoutAudit {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discount_id", nullable = false)
    private Discount discount;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "target_type", nullable = false)
    private TargetType targetType;
    
    @Column(name = "target_id")
    private Long targetId;
}


