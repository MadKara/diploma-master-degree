package com.karalash.ukrcontent.utils;

import com.karalash.ukrcontent.security.jwt.JwtUser;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ServiceUtils {
    public static String getAuthority() {
        JwtUser user = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<GrantedAuthority> authorities = (List<GrantedAuthority>) user.getAuthorities();
        GrantedAuthority grantedAuthority = authorities.get(0);
        return grantedAuthority.getAuthority();
    }
}
