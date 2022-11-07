package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.UserDto;
import com.karalash.ukrcontent.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/authentication/")
@RequiredArgsConstructor
@CrossOrigin
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("registration")
    public UserDto addNewCommonUser(@RequestParam String userName, @RequestParam String email,
                                    @RequestParam String password,
                                    @RequestParam(value = "file") MultipartFile avatar) {
        return registrationService.register(new UserDto(0, userName, email, password, null, 0), avatar);
    }
}
