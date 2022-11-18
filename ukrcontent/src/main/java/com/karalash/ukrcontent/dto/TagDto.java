package com.karalash.ukrcontent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TagDto {
    private int id;
    private String label;
//    private List<ContentDto> contents;
//
//    public TagDto(int id, String label) {
//        this.id = id;
//        this.label = label;
//    }
}
