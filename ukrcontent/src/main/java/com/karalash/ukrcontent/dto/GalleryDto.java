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
public class GalleryDto {
    private int id;
    private String imgPath;
    private Timestamp dateTime;
    private ContentDto content;
}
