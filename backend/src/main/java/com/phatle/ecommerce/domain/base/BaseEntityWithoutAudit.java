package com.phatle.ecommerce.domain.base;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class BaseEntityWithoutAudit {
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
