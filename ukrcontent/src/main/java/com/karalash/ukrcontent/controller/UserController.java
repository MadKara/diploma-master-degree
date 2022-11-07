package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.UserDto;
import com.karalash.ukrcontent.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("service-api/users/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    @GetMapping("/current")
    public UserDto getCurrent() {
        return userService.getCurrentUser();
    }

    @GetMapping("{userId}")
    public UserDto getUserById(@PathVariable int userId) {
        return userService.getUserById(userId);
    }

    @GetMapping
    public List<UserDto> getAllCommonUsers() {
        return userService.getAllCommonUsers();
    }

    @GetMapping("/admins")
    public List<UserDto> getAllAdmins() {
        return userService.getAdmins();
    }

    ///// to do
    @PostMapping("admin")
    public UserDto addNewAdmin(@RequestBody @Validated UserDto user) {
        return userService.addNewAdmin(user);
    }

    ///// to do
    @PutMapping
    public UserDto updateUser(@RequestBody @Validated UserDto user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("{userId}")
    public void remove(@PathVariable int userId) {
        userService.removeUser(userId);
    }
}
