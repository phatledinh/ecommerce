package com.phatle.ecommerce.domain;

import com.phatle.ecommerce.domain.enums.BannerPosition;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "banners")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Banner extends BaseEntity {
    @Column(name = "image_url", nullable = false)
    private String imageUrl;
    
    @Column(name = "link_url")
    private String linkUrl;
    
    private String title;
    
    @Enumerated(EnumType.STRING)
    private BannerPosition position = BannerPosition.HOME_MAIN;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
}


