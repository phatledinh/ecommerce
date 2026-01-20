package com.phatle.ecommerce.domain;

import com.phatle.ecommerce.domain.enums.TargetType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "discount_targets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiscountTarget extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discount_id", nullable = false)
    private Discount discount;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "target_type", nullable = false)
    private TargetType targetType;
    
    @Column(name = "target_id")
    private Long targetId;
}


