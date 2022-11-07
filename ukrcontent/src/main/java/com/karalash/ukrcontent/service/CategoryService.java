package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAll();

    CategoryDto addNew(CategoryDto company);
}
