package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.dto.CategoryDto;
import com.karalash.ukrcontent.mapper.CategoryMapper;
import com.karalash.ukrcontent.model.entities.Category;
import com.karalash.ukrcontent.repos.CategoryRepo;
import com.karalash.ukrcontent.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryMapper categoryMapper;
    private final CategoryRepo categoryRepo;

    @Override
    public List<CategoryDto> getAll() {
        List<Category> categories = categoryRepo.findAll();
        return categoryMapper.toDtos(categories);
    }

    @Override
    public CategoryDto addNew(CategoryDto company) {
        Category categoryEntity = categoryMapper.toEntity(company);
        categoryRepo.save(categoryEntity);
        return categoryMapper.toDto(categoryEntity);
    }
}
