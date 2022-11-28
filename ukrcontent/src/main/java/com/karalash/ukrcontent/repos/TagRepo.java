package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepo extends JpaRepository<Tag, Integer> {
    List<Tag> findAllByContents_Id(int contentId);

    Tag findByLabel(String label);
}
