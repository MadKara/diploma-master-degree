package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.dto.ContentDto;
import com.karalash.ukrcontent.mapper.ContentMapper;
import com.karalash.ukrcontent.model.entities.Content;
import com.karalash.ukrcontent.repos.ContentRepo;
import com.karalash.ukrcontent.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService {

    private final ContentRepo contentRepo;
    private final ContentMapper contentMapper;

    @Override
    public ContentDto getById(int id) {
        Optional<Content> byId = contentRepo.findById(id);
        if (byId.isEmpty()) {
            throw new IllegalArgumentException(String.format("Content with %s id not found", id));
        }

        return contentMapper.toDto(byId.get());
    }

    @Override
    public List<ContentDto> getAll() {
        List<Content> contents = contentRepo.findAll();
        return contentMapper.toDtos(contents);
    }

    @Override
    public ContentDto addNew(ContentDto company) {
        Content contentEntity = contentMapper.toEntity(company);
        contentRepo.save(contentEntity);
        return contentMapper.toDto(contentEntity);
    }

    @Override
    public ContentDto updateContent(ContentDto company) {
        return null;
    }

    @Override
    public void removeContent(int id) {

    }
}
