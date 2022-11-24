package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Integer> {
    List<Comment> findByMessageContaining(String message);

    List<Comment> findAllByUserId(int id);

    List<Comment> findAllByContentId(int id);
}
