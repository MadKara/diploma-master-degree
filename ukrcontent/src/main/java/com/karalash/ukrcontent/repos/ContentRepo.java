package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepo extends JpaRepository<Content, Integer> {
}
