package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
