package com.phatle.ecommerce.exception;

public abstract class BaseException extends RuntimeException {
    protected BaseException(String message) {
        super(message);
    }
}

