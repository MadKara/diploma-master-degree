package com.karalash.ukrcontent.security.jwt;

import com.karalash.ukrcontent.model.entities.User;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class JwtUserFactory {

    public static JwtUser create(User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                mapToGrantedAuthorities(user.getIsAdmin())
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(int adminPermissions) {
        SimpleGrantedAuthority authority = null;
        if (adminPermissions == 0) {
            authority = new SimpleGrantedAuthority("USER");
        } else if (adminPermissions == 1) {
            authority = new SimpleGrantedAuthority("ADMIN");
        }
        return Collections.singletonList(authority);
    }
}
