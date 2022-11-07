package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto getCurrentUser();

    UserDto getUserById(int id);

    List<UserDto> getAdmins();

    List<UserDto> getAllCommonUsers();

    UserDto addNewAdmin(UserDto admin);

    UserDto updateUser(UserDto userDto);

    void removeUser(int id);
}
