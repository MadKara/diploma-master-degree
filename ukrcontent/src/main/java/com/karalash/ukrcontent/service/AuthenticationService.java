package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.AuthenticationRequest;

public interface AuthenticationService {
    String login(AuthenticationRequest authenticationRequest);
}
