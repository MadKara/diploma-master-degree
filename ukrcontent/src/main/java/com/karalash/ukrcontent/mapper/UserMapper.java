package com.karalash.ukrcontent.mapper;

import com.karalash.ukrcontent.dto.UserDto;
import com.karalash.ukrcontent.model.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements Mapper<UserDto, User> {
    @Override
    public UserDto toDto(User input) {
        return UserDto.builder()
                .id(input.getId())
                .userName(input.getUsername())
                .email(input.getEmail())
                .password(input.getPassword())
                .avatarPath(input.getAvatarPath())
                .isAdmin(input.getIsAdmin())
                .build();
    }

    @Override
    public User toEntity(UserDto input) {
        User entity = new User();
        entity.setId(input.getId());
        entity.setUsername(input.getUserName());
        entity.setEmail(input.getEmail());
        entity.setPassword(input.getPassword());
        entity.setAvatarPath(input.getAvatarPath());
        entity.setIsAdmin(input.getIsAdmin());
        return entity;
    }
}
