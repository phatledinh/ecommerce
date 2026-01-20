package com.phatle.ecommerce.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String slug;
    
    @Column(name = "sku_base")
    private String skuBase;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;
    
    private String thumbnail;
    
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "promotion_info", columnDefinition = "TEXT")
    private String promotionInfo;

    @Column(name = "free_gifts", columnDefinition = "TEXT")
    private String freeGifts;

    @Column(name = "other_offers", columnDefinition = "TEXT")
    private String otherOffers;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<ProductImage> images = new HashSet<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<ProductVariant> variants = new HashSet<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<ProductSpec> specs = new HashSet<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<Review> reviews = new HashSet<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<Wishlist> wishlists = new HashSet<>();
}