package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.cloudinaryapi.CloudinaryManager;
import com.karalash.ukrcontent.dto.UserDto;
import com.karalash.ukrcontent.mapper.UserMapper;
import com.karalash.ukrcontent.model.entities.User;
import com.karalash.ukrcontent.repos.UserRepo;
import com.karalash.ukrcontent.service.RegistrationService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Data
@Slf4j
public class RegistrationServiceImpl implements RegistrationService {

    private final UserMapper userMapper;
    private final UserRepo userRepo;

    private final CloudinaryManager cloudinaryManager;

    @Override
    public UserDto register(UserDto user, MultipartFile avatar) {
        User userEntity = userMapper.toEntity(user);
        userEntity.setAvatarPath("");
        userRepo.save(userEntity);
        return getUserDto(avatar, userEntity);
    }

    private UserDto getUserDto(MultipartFile avatar, User userEntity) {
        String url = "";
        if (avatar != null) {
            try {
                url = cloudinaryManager.uploadImage(avatar, "users", userEntity.getId());
            } catch (IOException e) {
                log.error("Error save image to cloudinary: {}", e.getMessage());
            }
            userEntity.setAvatarPath(url);
        }
        userRepo.save(userEntity);
        return userMapper.toDto(userEntity);
    }
}
