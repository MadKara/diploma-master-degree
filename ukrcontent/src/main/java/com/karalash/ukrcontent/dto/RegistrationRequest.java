package com.karalash.ukrcontent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {
    @NotBlank
    private String userName;

    @NotBlank
    private String password;

    @NotBlank
    private String email;

    private String avatarPath;
}
