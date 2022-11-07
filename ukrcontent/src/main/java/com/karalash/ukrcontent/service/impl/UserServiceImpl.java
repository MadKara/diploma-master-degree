package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.dto.UserDto;
import com.karalash.ukrcontent.mapper.UserMapper;
import com.karalash.ukrcontent.model.entities.User;
import com.karalash.ukrcontent.repos.UserRepo;
import com.karalash.ukrcontent.security.jwt.JwtUser;
import com.karalash.ukrcontent.service.UserService;
import com.karalash.ukrcontent.utils.ServiceUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final UserMapper userMapper;

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
    public UserDto addNewAdmin(UserDto admin) {
        if (ServiceUtils.getAuthority().equals("ADMIN")) {
            admin.setIsAdmin(1);
            User entity = userMapper.toEntity(admin);
            userRepo.save(entity);
            return userMapper.toDto(entity);
        } else {
            throw new IllegalArgumentException("User is not ADMIN");
        }
    }

    @Override
    public UserDto updateUser(UserDto userDto) {
        User entity = userMapper.toEntity(userDto);
        userRepo.save(entity);
        return userMapper.toDto(entity);
    }

    @Override
    public void removeUser(int id) {
        userRepo.deleteById(id);
    }
}
