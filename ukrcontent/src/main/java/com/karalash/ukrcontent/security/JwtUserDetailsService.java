package com.karalash.ukrcontent.security;

import com.karalash.ukrcontent.model.entities.User;
import com.karalash.ukrcontent.repos.UserRepo;
import com.karalash.ukrcontent.security.jwt.JwtUserFactory;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@Data
@Slf4j
public class JwtUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Loading user by name = " + username);
        User user = userRepo.findByUsername(username);
        return JwtUserFactory.create(user);
    }
}
