package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.AuthenticationRequest;
import com.karalash.ukrcontent.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/authentication/")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("login")
    public String login(@Validated @RequestBody AuthenticationRequest authenticationRequest) {
        return authenticationService.login(authenticationRequest);
    }
}
