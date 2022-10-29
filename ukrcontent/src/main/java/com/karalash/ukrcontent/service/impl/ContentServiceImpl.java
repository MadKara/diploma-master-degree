package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.dto.ContentDto;
import com.karalash.ukrcontent.mapper.ContentMapper;
import com.karalash.ukrcontent.model.entities.Content;
import com.karalash.ukrcontent.repos.ContentRepo;
import com.karalash.ukrcontent.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService {

    private final ContentRepo contentRepo;
    private final ContentMapper contentMapper;

    @Override
    public ContentDto getById(int id) {
        return null;
    }

    @Override
    public List<ContentDto> getAll() {
        List<Content> contents = contentRepo.findAll();
        return contentMapper.toDtos(contents);
    }

    @Override
    public ContentDto addNew(ContentDto company) {
        return null;
    }

    @Override
    public ContentDto updateContent(ContentDto company) {
        return null;
    }

    @Override
    public void removeContent(int id) {

    }
}
