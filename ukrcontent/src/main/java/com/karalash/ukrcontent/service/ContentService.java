package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.ContentDto;

import java.util.List;

public interface ContentService {
    ContentDto getById(int id);

    List<ContentDto> getAll();

    ContentDto addNew(ContentDto company);

    ContentDto updateContent(ContentDto company);

    void removeContent(int id);
}
