package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.dto.ContentDto;
import com.karalash.ukrcontent.mapper.CategoryMapper;
import com.karalash.ukrcontent.mapper.ContentMapper;
import com.karalash.ukrcontent.model.entities.Category;
import com.karalash.ukrcontent.model.entities.Content;
import com.karalash.ukrcontent.model.entities.User;
import com.karalash.ukrcontent.repos.CategoryRepo;
import com.karalash.ukrcontent.repos.ContentRepo;
import com.karalash.ukrcontent.repos.UserRepo;
import com.karalash.ukrcontent.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService {

    private final ContentRepo contentRepo;
    private final UserRepo userRepo;
    private final CategoryRepo categoryRepo;
    private final ContentMapper contentMapper;
    private final CategoryMapper categoryMapper;
    private final WordServiceImpl wordService;

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
    public List<ContentDto> getByUserId(int id) {
        List<Content> contents = contentRepo.findAllByUserId(id);

        return contentMapper.toDtos(contents);
    }

    @Override
    public List<ContentDto> getByCategory(String name) {
        List<Content> byCategoryName = contentRepo.findAllByCategoryName(name);

        return contentMapper.toDtos(byCategoryName);
    }

    @Override
    public List<ContentDto> getByTitleContaining(String title) {
        List<Content> byTitleContaining = contentRepo.findByTitleContaining(title);

        return contentMapper.toDtos(byTitleContaining);
    }

    @Override
    public ContentDto getByTitle(String title) {
        Content content = contentRepo.findByTitle(title);
        return contentMapper.toDto(content);
    }

    @Override
    public ContentDto addNew(ContentDto content, int userId, Integer categoryId, String mainLink) throws IOException {
        Optional<User> userById = userRepo.findById(userId);
        if (userById.isEmpty()) {
            throw new IllegalArgumentException("Not found user with id: " + userId);
        }
        Optional<Category> categoryById;
        if (categoryId == null) {
            var categories = categoryRepo.findAll();
            var words = wordService.getMostRepeatedWords(mainLink);
            Map<Integer, Integer> matches = new HashMap<>();
            categories.forEach(category -> {
                var count = category.getWords().stream().filter(word -> words.contains(word.getWord())).count();
                matches.put(category.getId(), (int) count);
            });
            System.out.println(matches);
//            var suitableCat = matches.entrySet().stream().max((entry1, entry2) -> entry1.getValue() > entry2.getValue() ? 1 : -1).get().getKey();
            var suitableCat = Collections.max(matches.entrySet(), Comparator.comparingInt(Map.Entry::getValue)).getKey();

            if (suitableCat == 0){
                categoryById = categoryRepo.findById(1);
            } else {
                categoryById = categoryRepo.findById(suitableCat);
            }
        } else {
            categoryById = categoryRepo.findById(categoryId);
            if (categoryById.isEmpty()) {
                throw new IllegalArgumentException("Not found category with id: " + userId);
            }
        }

        User userEntity = userById.get();
        Category categoryEntity = categoryById.get();

        content.getUser().setId(userEntity.getId());
        content.setCategory(categoryMapper.toDto(categoryEntity));
        content.getExternalResources().setBrowseLink(mainLink);

        Content contentEntity = contentMapper.toEntity(content);
        contentEntity.setUser(userEntity);
        contentEntity.setCategory(categoryEntity);
        contentEntity.setDateTime(new Timestamp(System.currentTimeMillis()));
        contentRepo.save(contentEntity);
        return contentMapper.toDto(contentEntity);
    }

    @Override
    public ContentDto updateContent(ContentDto content) {
        Optional<Content> byId = contentRepo.findById(content.getId());
        if (byId.isEmpty()) {
            throw new IllegalArgumentException("Not found content with id: " + content.getId());
        }
        Content contentEntity = byId.get();
        contentEntity.setTitle(content.getTitle());
        contentEntity.setDescription(content.getDescription());
        contentEntity.setDateTime(new Timestamp(System.currentTimeMillis()));
        contentRepo.save(contentEntity);

        return contentMapper.toDto(contentEntity);
    }

    @Override
    public void deleteContent(int id) {
        contentRepo.deleteById(id);
    }

    private void identifiedLang() {

    }
}
