package com.phatle.ecommerce.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "suppliers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Supplier extends BaseEntity {
    @Column(nullable = false)
    private String name;
    
    @Column(name = "contact_person")
    private String contactPerson;
    
    private String phone;
    
    private String email;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    private Set<InventoryReceipt> inventoryReceipts = new HashSet<>();
}
