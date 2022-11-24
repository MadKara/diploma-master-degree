package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.CommentDto;

import java.util.List;

public interface CommentService {
    CommentDto getById(int id);

    List<CommentDto> getAll();

    List<CommentDto> getByUserId(int id);

    List<CommentDto> getByMessageContaining(String message);

    CommentDto addNew(String message, int userId, int contentId);

    CommentDto updateComment(CommentDto comment);

    void deleteComment(int id);

    List<CommentDto> getByContentId(int id);
}
