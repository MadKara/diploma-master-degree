package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
    Category findByName(String name);
}
