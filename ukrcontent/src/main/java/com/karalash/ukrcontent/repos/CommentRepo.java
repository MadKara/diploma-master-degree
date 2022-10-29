package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Integer> {
}
