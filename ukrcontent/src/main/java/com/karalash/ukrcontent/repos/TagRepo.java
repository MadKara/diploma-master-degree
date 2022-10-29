package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepo extends JpaRepository<Tag, Integer> {
}
