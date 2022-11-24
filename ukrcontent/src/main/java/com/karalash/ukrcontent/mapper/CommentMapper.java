package com.karalash.ukrcontent.mapper;

import com.karalash.ukrcontent.dto.CommentDto;
import com.karalash.ukrcontent.model.entities.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentMapper implements Mapper<CommentDto, Comment>{
    private final ContentMapper contentMapper;
    private final UserMapper userMapper;

    @Override
    public CommentDto toDto(Comment input) {
        return CommentDto.builder()
                .id(input.getId())
                .message(input.getMessage())
                .dateTime(input.getDateTime())
                .user(userMapper.toDto(input.getUser()))
                .content(contentMapper.toDto(input.getContent()))
                .build();
    }

    @Override
    public Comment toEntity(CommentDto input) {
        Comment entity = new Comment();
        entity.setId(input.getId());
        entity.setMessage(input.getMessage());
        entity.setDateTime(input.getDateTime());
        entity.setUser(userMapper.toEntity(input.getUser()));
        entity.setContent(contentMapper.toEntity(input.getContent()));
        return entity;
    }
}
