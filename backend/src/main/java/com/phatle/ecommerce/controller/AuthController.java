package com.phatle.ecommerce.controller;

import com.phatle.ecommerce.annotation.ApiMessage;
import com.phatle.ecommerce.domain.user.User;
import com.phatle.ecommerce.dto.request.LoginRequest;
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
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
    @ApiMessage("Đăng nhập thành công")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginDTO) {
        User currentUser = userService.login(loginDTO.getEmail(), loginDTO.getPassword());

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDTO.getEmail(), loginDTO.getPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

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

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(LoginResponse.builder()
                        .accessToken(accessToken)
                        .user(userResponse)
                        .build());
    }

    @GetMapping("/refresh")
    @ApiMessage("Lấy token mới thành công")
    public ResponseEntity<LoginResponse> refreshToken(@CookieValue(name = "refresh_token", required = false) String refreshToken) {
        if (refreshToken == null) throw new RuntimeException("Refresh token không tồn tại");

        Jwt decodedToken = this.securityUtil.checkValidRefreshToken(refreshToken);
        String email = decodedToken.getSubject();

        User currentUser = userService.getUserByRefreshTokenAndEmail(refreshToken, email);
        if (currentUser == null) throw new RuntimeException("Refresh token không hợp lệ");

        UserResponse userResponse = userService.convertToUserResponse(currentUser);

        List<SimpleGrantedAuthority> authorities = currentUser.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList());

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);

        String newAccessToken = this.securityUtil.createAccessToken(authentication, userResponse);
        String newRefreshToken = this.securityUtil.createRefreshToken(email, userResponse);

        this.userService.updateUserToken(newRefreshToken, email);

        ResponseCookie cookie = ResponseCookie.from("refresh_token", newRefreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(LoginResponse.builder()
                        .accessToken(newAccessToken)
                        .user(userResponse)
                        .build());
    }

    @PostMapping("/logout")
    @ApiMessage("Đăng xuất thành công")
    public ResponseEntity<Void> logout(@CookieValue(name = "refresh_token", required = false) String refreshToken) {
        if (refreshToken != null && !refreshToken.isEmpty()) {
            try {
                Jwt decodedToken = this.securityUtil.checkValidRefreshToken(refreshToken);
                this.userService.clearUserToken(decodedToken.getSubject());
            } catch (Exception ignored) {}
        }

        ResponseCookie cookie = ResponseCookie.from("refresh_token", "").httpOnly(true).secure(true).path("/").maxAge(0).build();
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }
}