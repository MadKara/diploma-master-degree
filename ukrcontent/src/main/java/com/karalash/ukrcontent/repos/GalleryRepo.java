package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepo extends JpaRepository<Gallery, Integer> {
}
