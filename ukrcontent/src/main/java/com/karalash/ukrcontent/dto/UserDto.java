package com.karalash.ukrcontent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private int id;
    private String userName;
    private String email;
    private String password;
    private String avatarPath;
    private int isAdmin;
}
