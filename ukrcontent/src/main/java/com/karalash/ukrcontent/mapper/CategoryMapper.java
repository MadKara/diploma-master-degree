package com.karalash.ukrcontent.mapper;

import com.karalash.ukrcontent.dto.CategoryDto;
import com.karalash.ukrcontent.model.entities.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper implements Mapper<CategoryDto, Category> {
    @Override
    public CategoryDto toDto(Category input) {
        return CategoryDto.builder()
                .id(input.getId())
                .name(input.getName())
                .build();
    }

    @Override
    public Category toEntity(CategoryDto input) {
        Category entity = new Category();
        entity.setId(input.getId());
        entity.setName(input.getName());
        return entity;
    }
}
