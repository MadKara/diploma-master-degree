package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepo extends JpaRepository<Content, Integer> {
    List<Content> findByTitleContaining(String title);

    List<Content> findAllByCategoryName(String title);

    List<Content> findAllByUserId(int id);

    Content findByTitle(String title);

    List<Content> findContentsByTagsId(int tagId);
}
