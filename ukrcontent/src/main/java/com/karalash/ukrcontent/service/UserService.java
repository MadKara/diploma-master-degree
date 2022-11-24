package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    UserDto getCurrentUser();

    UserDto getUserById(int id);

    List<UserDto> getAdmins();

    List<UserDto> getAllCommonUsers();

    UserDto addNewAdmin(UserDto admin, MultipartFile avatar);

    UserDto updateUser(UserDto userDto, MultipartFile avatar);

    void removeUser(int id);
}
