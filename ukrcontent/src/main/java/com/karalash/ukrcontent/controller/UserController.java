package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.UserDto;
import com.karalash.ukrcontent.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("admin")
    public UserDto addNewAdmin(@RequestParam String userName, @RequestParam String email,
                               @RequestParam String password,
                               @RequestParam(value = "file") MultipartFile avatar) {
        return userService.addNewAdmin(new UserDto(0, userName, email, password, "", 1), avatar);
    }

    @PutMapping
    public UserDto updateUser(@RequestParam int id, @RequestParam String userName, @RequestParam String email,
                              @RequestParam String password,
                              @RequestParam(value = "file") MultipartFile avatar) {
        return userService.updateUser(new UserDto(id, userName, email, password, "", 0), avatar);
    }

    @DeleteMapping("{userId}")
    public void remove(@PathVariable int userId) {
        userService.removeUser(userId);
    }
}
