package com.phatle.ecommerce.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.phatle.ecommerce.dto.response.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;


import jakarta.servlet.http.HttpServletResponse;

@ControllerAdvice
public class FormatRestResponse implements ResponseBodyAdvice<Object> {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {

        HttpServletResponse servletResponse = ((ServletServerHttpResponse) response).getServletResponse();
        int status = servletResponse.getStatus();

        if (body instanceof ApiResponse) {
            return body;
        }

        String path = request.getURI().getPath();
        if (path.startsWith("/v3/api-docs") || path.startsWith("/swagger-ui")) {
            return body;
        }

        ApiResponse<Object> restResponse = new ApiResponse<>();
        restResponse.setStatusCode(status);

        if (status >= 400) {
            restResponse.setError(body != null ? body.toString() : "Unknown error");
            restResponse.setMessage(body != null ? body.toString() : null);
            restResponse.setData(null);
        } else {
            com.phatle.ecommerce.annotation.ApiMessage apiMessage = returnType.getMethodAnnotation(com.phatle.ecommerce.annotation.ApiMessage.class);
            restResponse.setMessage(apiMessage != null ? apiMessage.value() : "Success");
            restResponse.setData(body);
        }

        if (body instanceof String) {
            try {
                response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
                return objectMapper.writeValueAsString(restResponse);
            } catch (JsonProcessingException e) {
                return body;
            }
        }

        return restResponse;
    }
}