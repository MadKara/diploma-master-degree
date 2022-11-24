package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.dto.CommentDto;
import com.karalash.ukrcontent.mapper.CommentMapper;
import com.karalash.ukrcontent.mapper.ContentMapper;
import com.karalash.ukrcontent.mapper.UserMapper;
import com.karalash.ukrcontent.model.entities.Comment;
import com.karalash.ukrcontent.model.entities.Content;
import com.karalash.ukrcontent.model.entities.User;
import com.karalash.ukrcontent.repos.CommentRepo;
import com.karalash.ukrcontent.repos.ContentRepo;
import com.karalash.ukrcontent.repos.UserRepo;
import com.karalash.ukrcontent.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepo commentRepo;
    private final UserRepo userRepo;
    private final ContentRepo contentRepo;
    private final CommentMapper commentMapper;
    private final UserMapper userMapper;
    private final ContentMapper contentMapper;

    @Override
    public CommentDto getById(int id) {
        Optional<Comment> byId = commentRepo.findById(id);
        if (byId.isEmpty()) {
            throw new IllegalArgumentException(String.format("Comment with %s id not found", id));
        }

        return commentMapper.toDto(byId.get());
    }

    @Override
    public List<CommentDto> getAll() {
        List<Comment> comments = commentRepo.findAll();

        return commentMapper.toDtos(comments);
    }

    @Override
    public List<CommentDto> getByUserId(int id) {
        List<Comment> comments = commentRepo.findAllByUserId(id);

        return commentMapper.toDtos(comments);
    }

    @Override
    public List<CommentDto> getByMessageContaining(String message) {
        List<Comment> byMessageContaining = commentRepo.findByMessageContaining(message);

        return commentMapper.toDtos(byMessageContaining);
    }

    @Override
    public CommentDto addNew(String message, int userId, int contentId) {
        Optional<User> userById = userRepo.findById(userId);
        if (userById.isEmpty()) {
            throw new IllegalArgumentException("Not found user with id: " + userId);
        }
        Optional<Content> contentById = contentRepo.findById(contentId);
        if (contentById.isEmpty()) {
            throw new IllegalArgumentException("Not found content with id: " + contentById);
        }
        User userEntity = userById.get();
        Content contentEntity = contentById.get();

        Comment commentEntity = commentMapper.toEntity(new CommentDto(0, message, null,
                userMapper.toDto(userEntity), contentMapper.toDto(contentEntity)));
        commentEntity.setDateTime(new Timestamp(System.currentTimeMillis()));
        commentRepo.save(commentEntity);

        return commentMapper.toDto(commentEntity);
    }

    @Override
    public CommentDto updateComment(CommentDto comment) {
        Optional<Comment> byId = commentRepo.findById(comment.getId());
        if (byId.isEmpty()) {
            throw new IllegalArgumentException("Not found comment with id: " + comment.getId());
        }
        Comment commentEntity = byId.get();
        commentEntity.setMessage(comment.getMessage());
        commentEntity.setDateTime(new Timestamp(System.currentTimeMillis()));
        commentRepo.save(commentEntity);

        return commentMapper.toDto(commentEntity);
    }

    @Override
    public void deleteComment(int id) {
        commentRepo.deleteById(id);
    }

    @Override
    public List<CommentDto> getByContentId(int id) {
        List<Comment> comments = commentRepo.findAllByContentId(id);

        return commentMapper.toDtos(comments);
    }
}
