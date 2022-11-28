package com.karalash.ukrcontent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExternalResourcesDto {
    private int id;
    private String twitter;
    private String instagram;
    private String tiktok;
    private String telegram;
    private String youtube;
    private String browseLink;
}
