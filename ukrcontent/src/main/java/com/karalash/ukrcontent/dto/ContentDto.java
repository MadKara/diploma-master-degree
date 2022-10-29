package com.karalash.ukrcontent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentDto {
    private int id;
    private String title;
    private String description;
    //private ExternalResourcesDto externalResources;
}
