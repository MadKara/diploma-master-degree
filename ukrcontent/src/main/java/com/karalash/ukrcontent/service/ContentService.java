package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.ContentDto;

import java.io.IOException;
import java.util.List;

public interface ContentService {
    ContentDto getById(int id);

    List<ContentDto> getAll();

    List<ContentDto> getByUserId(int id);

    List<ContentDto> getByCategory(String name);

    List<ContentDto> getByTitleContaining(String title);

    ContentDto getByTitle(String title);

    ContentDto addNew(ContentDto company, int userId, Integer categoryId, String mainLink) throws IOException;

    ContentDto updateContent(ContentDto content);

    void deleteContent(int id);
}
