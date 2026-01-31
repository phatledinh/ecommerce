package com.phatle.ecommerce.domain.base;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntityWithoutAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    protected LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    protected LocalDateTime updatedAt;
}
