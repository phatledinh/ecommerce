package com.phatle.ecommerce.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // Dùng ObjectMapper để chuyển đối tượng Java thành JSON
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        // 1. Thiết lập HTTP Status Code là 401
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); 

        // 2. Thiết lập Content Type là JSON
        response.setContentType("application/json;charset=UTF-8");

        // 3. Tạo body response JSON chi tiết
        Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("timestamp", new java.util.Date());
        errorDetails.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        errorDetails.put("error", "Unauthorized");
        errorDetails.put("message", "Truy cap bi tu choi. Yeu cau token JWT hop le.");
        errorDetails.put("details", authException.getMessage());
        errorDetails.put("path", request.getRequestURI());

        // 4. Ghi body JSON vào Response
        response.getWriter().write(objectMapper.writeValueAsString(errorDetails));
    }
}