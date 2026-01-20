package com.phatle.ecommerce.domain;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

import com.phatle.ecommerce.domain.enums.TransactionStatus;

@Entity
@Table(name = "payment_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentTransaction extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;
    
    @Column(name = "transaction_ref")
    private String transactionRef;
    
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;
    
    @Enumerated(EnumType.STRING)
    private TransactionStatus status = TransactionStatus.INIT;
    
    @Column(name = "response_code")
    private String responseCode;
    
    @Column(name = "raw_response", columnDefinition = "TEXT")
    private String rawResponse;
}


