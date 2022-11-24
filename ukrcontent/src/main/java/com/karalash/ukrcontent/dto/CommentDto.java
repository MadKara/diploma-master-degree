package com.karalash.ukrcontent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private int id;
    private String message;
    private Timestamp dateTime;
    private UserDto user;
    private ContentDto content;

    public CommentDto(int id, String message) {
        this.id = id;
        this.message = message;
    }
}
