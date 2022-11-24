package com.karalash.ukrcontent.mapper;

import com.karalash.ukrcontent.dto.CategoryDto;
import com.karalash.ukrcontent.model.entities.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoryMapper implements Mapper<CategoryDto, Category> {
    private final WordsMapper wordsMapper;

    @Override
    public CategoryDto toDto(Category input) {
        return CategoryDto.builder()
                .id(input.getId())
                .name(input.getName())
                .words(wordsMapper.toDtos(input.getWords()))
                .build();
    }

    @Override
    public Category toEntity(CategoryDto input) {
        Category entity = new Category();
        entity.setId(input.getId());
        entity.setName(input.getName());
        entity.setWords(wordsMapper.toEntities(input.getWords()));
        return entity;
    }
}
