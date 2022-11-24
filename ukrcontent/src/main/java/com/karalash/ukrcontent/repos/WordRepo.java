package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordRepo extends JpaRepository<Word, Integer> {
    List<Word> findAllByCategories_Id(int categoryId);
}
