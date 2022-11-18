package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepo extends JpaRepository<Gallery, Integer> {
    List<Gallery> findByContentId(int id);
}
