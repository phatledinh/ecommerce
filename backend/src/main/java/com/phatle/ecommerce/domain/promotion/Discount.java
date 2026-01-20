package com.phatle.ecommerce.domain.promotion;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.phatle.ecommerce.domain.base.BaseEntity;
import com.phatle.ecommerce.domain.order.Order;

@Entity
@Table(name = "discounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Discount extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String code;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "discount_type", nullable = false)
    private DiscountType discountType;
    
    @Column(name = "discount_value", nullable = false, precision = 15, scale = 2)
    private BigDecimal discountValue;
    
    @Column(name = "max_discount_amount", precision = 15, scale = 2)
    private BigDecimal maxDiscountAmount;
    
    @Column(name = "min_order_value", precision = 15, scale = 2)
    private BigDecimal minOrderValue = BigDecimal.ZERO;
    
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;
    
    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;
    
    @Column(name = "usage_limit")
    private Integer usageLimit = 0;
    
    @Column(name = "usage_count")
    private Integer usageCount = 0;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @OneToMany(mappedBy = "discount", cascade = CascadeType.ALL)
    private Set<DiscountTarget> targets = new HashSet<>();
    
    @OneToMany(mappedBy = "discount", cascade = CascadeType.ALL)
    private Set<UserDiscountUsage> usages = new HashSet<>();
    
    @OneToMany(mappedBy = "discountApplied", cascade = CascadeType.ALL)
    private Set<Order> orders = new HashSet<>();
}


