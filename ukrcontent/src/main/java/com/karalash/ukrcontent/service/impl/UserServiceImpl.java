package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.cloudinaryapi.CloudinaryManager;
import com.karalash.ukrcontent.dto.UserDto;
import com.karalash.ukrcontent.mapper.UserMapper;
import com.karalash.ukrcontent.model.entities.Content;
import com.karalash.ukrcontent.model.entities.User;
import com.karalash.ukrcontent.repos.UserRepo;
import com.karalash.ukrcontent.security.jwt.JwtUser;
import com.karalash.ukrcontent.service.UserService;
import com.karalash.ukrcontent.utils.ServiceUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final UserMapper userMapper;

    private final CloudinaryManager cloudinaryManager;

    @Override
    public UserDto getCurrentUser() {
        JwtUser jwtUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> byId = userRepo.findById(jwtUser.getId());
        return byId.map(userMapper::toDto).orElse(null);
    }

    @Override
    public UserDto getUserById(int id) {
        String authority = ServiceUtils.getAuthority();
        if (authority.equals("ADMIN")) {
            Optional<User> user = userRepo.findById(id);
            if (user.isPresent()) {
                return userMapper.toDto(user.get());
            } else {
                throw new IllegalArgumentException("User not found");
            }
        } else {
            throw new IllegalArgumentException("User is not ADMIN");
        }
    }

    @Override
    public List<UserDto> getAdmins() {
        if (ServiceUtils.getAuthority().equals("ADMIN")) {
            List<User> users = userRepo.findAllByIsAdmin(1);
            return userMapper.toDtos(users);
        } else {
            throw new IllegalArgumentException("User is not ADMIN");
        }
    }

    @Override
    public List<UserDto> getAllCommonUsers() {
        List<User> users = userRepo.findAllByIsAdmin(0);
        return userMapper.toDtos(users);
    }

    @Override
    public UserDto addNewAdmin(UserDto admin, MultipartFile avatar) {
        if (ServiceUtils.getAuthority().equals("ADMIN")) {
            User userEntity = userMapper.toEntity(admin);
            userEntity.setAvatarPath("");
            userRepo.save(userEntity);
            return getUserDto(avatar, userEntity);
        } else {
            throw new IllegalArgumentException("User is not ADMIN");
        }
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

    @Override
    public UserDto updateUser(UserDto user, MultipartFile avatar) {
        Optional<User> byId = userRepo.findById(user.getId());
        if (byId.isEmpty()) {
            throw new IllegalArgumentException("Not found user with id: " + user.getId());
        }
        User userEntity = byId.get();
        userEntity.setUsername(user.getUserName());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(user.getPassword());
        userEntity.setAvatarPath("");

        if (ServiceUtils.getAuthority().equals("ADMIN")) {
            userEntity.setIsAdmin(1);
        }
        userRepo.save(userEntity);
        return getUserDto(avatar, userEntity);
    }

    @Override
    public void removeUser(int id) {
        userRepo.deleteById(id);
    }
}
