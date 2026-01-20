package com.phatle.ecommerce.domain;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product_variants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariant extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(unique = true, nullable = false)
    private String sku;
    
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;
    
    @Column(name = "sale_price", precision = 15, scale = 2)
    private BigDecimal salePrice;
    
    @Column(name = "stock_quantity")
    private Integer stockQuantity = 0;
    
    private String image;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL)
    private Set<ProductAttributeValue> attributeValues = new HashSet<>();
    
    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL)
    private Set<CartItem> cartItems = new HashSet<>();
    
    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL)
    private Set<OrderItem> orderItems = new HashSet<>();
    
    @OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL)
    private Set<InventoryReceiptDetail> inventoryReceiptDetails = new HashSet<>();
    
    @OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL)
    private Set<InventoryLog> inventoryLogs = new HashSet<>();
}
