package com.phatle.ecommerce.domain.user;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "provinces")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Province {

    @Id
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    private String code;

    @OneToMany(mappedBy = "province")
    private List<District> districts;
}

