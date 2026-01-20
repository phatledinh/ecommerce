package com.phatle.ecommerce.domain.user;


import com.phatle.ecommerce.domain.base.BaseEntityWithoutAudit;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAddress extends BaseEntityWithoutAudit {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "receiver_name", nullable = false)
    private String receiverName;
    
    @Column(nullable = false)
    private String phone;
    
    @Column(name = "province_id")
    private Integer provinceId;
    
    @Column(name = "district_id")
    private Integer districtId;
    
    @Column(name = "ward_code")
    private String wardCode;
    
    @Column(name = "specific_address", nullable = false, columnDefinition = "TEXT")
    private String specificAddress;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "address_type")
    private AddressType addressType = AddressType.HOME;
    
    @Column(name = "is_default")
    private Boolean isDefault = false;
}
