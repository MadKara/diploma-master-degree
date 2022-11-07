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
public class ContentDto {
    private int id;
    private String title;
    private String description;
    private Timestamp dateTime;
    private UserDto user;
    private CategoryDto category;
    private ExternalResourcesDto externalResources;
}
