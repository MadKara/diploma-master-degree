package com.karalash.ukrcontent.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentDto {
    private int id;
    private String title;
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
    private Timestamp dateTime;
    private UserDto user;
    private CategoryDto category;
    private ExternalResourcesDto externalResources;
    private List<TagDto> tags;

    public ContentDto(int id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public ContentDto(int id, String title, String description, Timestamp dateTime, UserDto user, CategoryDto category, ExternalResourcesDto externalResources) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.user = user;
        this.category = category;
        this.externalResources = externalResources;
    }
}
