package com.phatle.ecommerce.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.phatle.ecommerce.domain.user.Role;
import com.phatle.ecommerce.domain.user.User;
import com.phatle.ecommerce.domain.user.UserStatus;
import com.phatle.ecommerce.dto.request.RegisterRequest;
import com.phatle.ecommerce.dto.response.UserResponse;
import com.phatle.ecommerce.repository.RoleRepository;
import com.phatle.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;
    private final ObjectMapper objectMapper;

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByPhone(String phone) {
        return userRepository.existsByPhone(phone);
    }

    public User handleGetUserByUsername(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    
    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return userRepository.findByRefreshTokenAndEmail(token, email).orElse(null);
    }

    @Transactional
    public User registerCustomer(RegisterRequest request) {
        Role customerRole = roleRepository.findByName("CUSTOMER")
                .orElseThrow(() -> new RuntimeException("Cấu hình hệ thống lỗi: Không tìm thấy Role CUSTOMER"));

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .status(UserStatus.ACTIVE)
                .roles(new HashSet<>(Collections.singletonList(customerRole))) 
                .build();

        return userRepository.save(user);
    }

    @Transactional
    public User registerCustomerWithAvatar(RegisterRequest request, MultipartFile avatarFile) {
        String avatarUrl = null;
        if (avatarFile != null && !avatarFile.isEmpty()) {
            try {
                avatarUrl = fileStorageService.storeFile(avatarFile, "avatars"); 
            } catch (Exception e) {
                throw new RuntimeException("Lỗi upload avatar: " + e.getMessage());
            }
        }

        Role customerRole = roleRepository.findByName("CUSTOMER")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Role CUSTOMER"));

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .status(UserStatus.ACTIVE)
                .avatar(avatarUrl)
                .roles(new HashSet<>(Collections.singletonList(customerRole)))
                .build();

        return userRepository.save(user);
    }

    public UserResponse convertToUserResponse(User user) {
        if (user == null) return null;

        Set<UserResponse.RoleResponse> roleResponses = new HashSet<>();
        if (user.getRoles() != null) {
            roleResponses = user.getRoles().stream()
                    .map((Role role) -> UserResponse.RoleResponse.builder()
                            .id((Long) null)
                            .name(role.getName())
                            .code(role.getCode())
                            .build())
                    .collect(Collectors.toSet());
        }

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .avatar(user.getAvatar())
                .status(user.getStatus() != null ? user.getStatus().name() : "UNKNOWN")
                .roles(roleResponses)
                .build();
    }
    
    public RegisterRequest parseRegisterData(String registerData) {
        try {
            return objectMapper.readValue(registerData, RegisterRequest.class);
        } catch (Exception e) {
            throw new RuntimeException("Dữ liệu đăng ký không hợp lệ: " + e.getMessage());
        }
    }

    public void updateUserToken(String token, String email) {
        User currentUser = this.handleGetUserByUsername(email);
        if (currentUser != null) {
            currentUser.setRefreshToken(token); 
            this.userRepository.save(currentUser);
        }
    }
    
    public void clearUserToken(String email) {
        User user = this.handleGetUserByUsername(email);
        if (user != null) {
            user.setRefreshToken(null);
            userRepository.save(user);
        }
    }
}