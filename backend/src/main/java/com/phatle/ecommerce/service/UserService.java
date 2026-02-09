package com.phatle.ecommerce.service;

import com.phatle.ecommerce.domain.user.Role;
import com.phatle.ecommerce.domain.user.User;
import com.phatle.ecommerce.domain.user.UserStatus;
import com.phatle.ecommerce.dto.request.RegisterRequest;
import com.phatle.ecommerce.dto.response.UserResponse;
import com.phatle.ecommerce.repository.RoleRepository;
import com.phatle.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public User handleGetUserByUsername(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User login(String email, String password) {
        User user = this.handleGetUserByUsername(email);
        if (user == null) {
            throw new BadCredentialsException("Tài khoản với email này không tồn tại.");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Mật khẩu không chính xác.");
        }

        if (user.getStatus() == UserStatus.BANNED || user.getStatus() == UserStatus.INACTIVE) {
            throw new BadCredentialsException("Tài khoản của bạn đã bị khóa hoặc chưa kích hoạt.");
        }

        return user;
    }

    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return userRepository.findByRefreshTokenAndEmail(token, email).orElse(null);
    }

    @Transactional
    public User registerCustomer(RegisterRequest request) {
        // Tìm Role CUSTOMER từ DB (đảm bảo DB đã có role này)
        Role customerRole = roleRepository.findByCode("CUSTOMER")
                .orElseThrow(() -> new RuntimeException("Role CUSTOMER chưa tồn tại trong hệ thống"));

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

    public UserResponse convertToUserResponse(User user) {
        if (user == null) return null;

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .avatar(user.getAvatar())
                .status(user.getStatus() != null ? user.getStatus().name() : "ACTIVE")
                .roles(user.getRoles().stream()
                        .map(role -> UserResponse.RoleResponse.builder()
                                .name(role.getName())
                                .code(role.getCode())
                                .build())
                        .collect(Collectors.toSet()))
                .build();
    }

    @Transactional
    public void updateUserToken(String token, String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setRefreshToken(token);
            userRepository.save(user);
        });
    }

    @Transactional
    public void clearUserToken(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setRefreshToken(null);
            userRepository.save(user);
        });
    }
}