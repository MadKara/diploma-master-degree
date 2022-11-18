package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.ContentDto;

import java.util.List;

public interface ContentService {
    ContentDto getById(int id);

    List<ContentDto> getAll();

    List<ContentDto> getByUserId(int id);

    List<ContentDto> getByCategory(String name);

    List<ContentDto> getByTitleContaining(String title);

    ContentDto getByTitle(String title);

    ContentDto addNew(ContentDto company, int userId, int categoryId);

    ContentDto updateContent(ContentDto content);

    void deleteContent(int id);
}
