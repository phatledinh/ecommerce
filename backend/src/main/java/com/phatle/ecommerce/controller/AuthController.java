package com.phatle.ecommerce.controller;

import com.phatle.ecommerce.annotation.ApiMessage;
import com.phatle.ecommerce.domain.user.User;
import com.phatle.ecommerce.dto.request.LoginRequest;
import com.phatle.ecommerce.dto.request.RegisterRequest;
import com.phatle.ecommerce.dto.response.LoginResponse;
import com.phatle.ecommerce.dto.response.UserResponse;
import com.phatle.ecommerce.service.UserService;
import com.phatle.ecommerce.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    
    @Value("${phatle.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpiration;

    @PostMapping("/login")
    @ApiMessage("Login successfully")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginDTO) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDTO.getEmail(), loginDTO.getPassword());
        
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User currentUser = userService.handleGetUserByUsername(loginDTO.getEmail());
        UserResponse userResponse = userService.convertToUserResponse(currentUser);

        String accessToken = this.securityUtil.createAccessToken(authentication, userResponse);

        String refreshToken = this.securityUtil.createRefreshToken(loginDTO.getEmail(), userResponse);

        this.userService.updateUserToken(refreshToken, loginDTO.getEmail());

        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true) 
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();

        LoginResponse res = LoginResponse.builder()
                .accessToken(accessToken)
                .user(userResponse) 
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(res);
    }

    @PostMapping("/register")
    @ApiMessage("Register successfully")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest registerDTO) {
        if (userService.existsByEmail(registerDTO.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }
        if (registerDTO.getPhone() != null && userService.existsByPhone(registerDTO.getPhone())) {
            throw new RuntimeException("Số điện thoại đã tồn tại");
        }
        
        User newUser = userService.registerCustomer(registerDTO);
        
        return ResponseEntity.status(201)
                .body(userService.convertToUserResponse(newUser));
    }
    
    @PostMapping(value = "/register-with-avatar", consumes = "multipart/form-data")
    @ApiMessage("Register with avatar successfully")
    public ResponseEntity<UserResponse> registerWithAvatar(
            @RequestPart("registerData") String registerData,
            @RequestPart(value = "avatar", required = false) MultipartFile avatarFile) {
        
        RegisterRequest registerDTO = userService.parseRegisterData(registerData);
        
        if (userService.existsByEmail(registerDTO.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }
        
        User newUser = userService.registerCustomerWithAvatar(registerDTO, avatarFile);
        
        return ResponseEntity.status(201)
                .body(userService.convertToUserResponse(newUser));
    }

    @GetMapping("/account")
    @ApiMessage("Fetch account successfully")
    public ResponseEntity<UserResponse> getAccount() {
        String email = SecurityUtil.getCurrentUserLogin()
                .orElseThrow(() -> new RuntimeException("Unauthorized: Không tìm thấy thông tin user"));

        User currentUser = userService.handleGetUserByUsername(email);
        return ResponseEntity.ok(userService.convertToUserResponse(currentUser));
    }
    
    @GetMapping("/refresh")
    @ApiMessage("Refresh token successfully")
    public ResponseEntity<LoginResponse> refreshToken(@CookieValue(name = "refresh_token", required = false) String refreshToken) {
        if (refreshToken == null) {
             throw new RuntimeException("Bạn chưa đăng nhập (Không có refresh token)");
        }

        Jwt decodedToken = this.securityUtil.checkValidRefreshToken(refreshToken);
        String email = decodedToken.getSubject();

        User currentUser = userService.getUserByRefreshTokenAndEmail(refreshToken, email);
        if (currentUser == null) {
            throw new RuntimeException("Refresh token không hợp lệ hoặc đã hết hạn");
        }

        UserResponse userResponse = userService.convertToUserResponse(currentUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                currentUser.getEmail(), null, null); 

        String newAccessToken = this.securityUtil.createAccessToken(authentication, userResponse);
        String newRefreshToken = this.securityUtil.createRefreshToken(email, userResponse);

        this.userService.updateUserToken(newRefreshToken, email);

        ResponseCookie cookie = ResponseCookie.from("refresh_token", newRefreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();

        LoginResponse res = LoginResponse.builder()
                .accessToken(newAccessToken)
                .user(userResponse)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(res);
    }
    
    @PostMapping("/logout")
    @ApiMessage("Logout successfully")
    public ResponseEntity<Void> logout(@CookieValue(name = "refresh_token", required = false) String refreshToken) {
        if (refreshToken != null && !refreshToken.isEmpty()) {
            try {
                 Jwt decodedToken = this.securityUtil.checkValidRefreshToken(refreshToken);
                 String email = decodedToken.getSubject();
                 this.userService.clearUserToken(email);
            } catch (Exception e) {
                System.out.println("Logout warning: " + e.getMessage());
            }
        }
        
        SecurityContextHolder.clearContext();
        
        ResponseCookie cookie = ResponseCookie.from("refresh_token", "")
                .httpOnly(true)
                .secure(true) 
                .path("/")
                .maxAge(0) 
                .build();
        
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(null);
    }
}