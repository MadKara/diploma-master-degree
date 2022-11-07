package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

public interface RegistrationService {

    UserDto register(UserDto user, MultipartFile avatar);
}
