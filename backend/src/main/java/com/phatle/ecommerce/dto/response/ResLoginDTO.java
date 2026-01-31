package com.phatle.ecommerce.dto.response;

import java.time.LocalDate;

import com.phatle.ecommerce.domain.user.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ResLoginDTO {
    private String accessToken;
    private UserLogin user;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserLogin {
        private Long id;
        private String email;
        private String name;
        private String avatar;
        private String phone;
        private LocalDate dateOfBirth;
        private Role role;
    }
}

