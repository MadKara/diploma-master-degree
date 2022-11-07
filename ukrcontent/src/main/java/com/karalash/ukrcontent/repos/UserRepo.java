package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByEmail(String email);
    List<User> findAllByIsAdmin(int adminType);
}
