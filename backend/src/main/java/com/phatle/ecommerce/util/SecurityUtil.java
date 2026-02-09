package com.phatle.ecommerce.util;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Service;

import com.phatle.ecommerce.dto.response.UserResponse;

@Service
public class SecurityUtil {

    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;

    private final JwtEncoder jwtEncoder;

    @Value("${phatle.jwt.base64-secret}")
    private String jwtKey;

    @Value("${phatle.jwt.access-token-validity-in-seconds}")
    private Long jwtExpiration;

    public SecurityUtil(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    public String createAccessToken(Authentication authentication, UserResponse user) {
        Instant now = Instant.now();
        Instant validity = now.plus(this.jwtExpiration, ChronoUnit.SECONDS);

        List<String> listRoles = authentication.getAuthorities().stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .collect(Collectors.toList());

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(authentication.getName())
                .claim("user", user)
                .claim("roles", listRoles)
                .build();

        JwsHeader header = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }

    public String createRefreshToken(String email, UserResponse user) {
        Instant now = Instant.now();
        Instant validity = now.plus(jwtExpiration * 10, ChronoUnit.SECONDS);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(email)
                .claim("email", user.getEmail())
                .claim("id", user.getId())
                .build();

        JwsHeader header = JwsHeader.with(JWT_ALGORITHM).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims))
                .getTokenValue();
    }

    public static Optional<String> getCurrentUserLogin() {
        SecurityContext context = SecurityContextHolder.getContext();
        return Optional.ofNullable(extractPrincipal(context.getAuthentication()));
    }

    private static String extractPrincipal(Authentication authentication) {
        if (authentication == null) return null;
        if (authentication.getPrincipal() instanceof UserDetails u) return u.getUsername();
        if (authentication.getPrincipal() instanceof Jwt jwt) return jwt.getSubject();
        if (authentication.getPrincipal() instanceof String s) return s;
        return null;
    }

    private SecretKey getSecretKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtKey);
        return new SecretKeySpec(keyBytes, JWT_ALGORITHM.getName());
    }

    public Jwt checkValidRefreshToken(String token) {
        return NimbusJwtDecoder.withSecretKey(getSecretKey())
                .macAlgorithm(JWT_ALGORITHM)
                .build()
                .decode(token);
    }
}
