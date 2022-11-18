package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.*;
import com.karalash.ukrcontent.service.ContentService;
import com.karalash.ukrcontent.service.ExternalResourcesService;
import lombok.RequiredArgsConstructor;
import org.checkerframework.common.value.qual.ArrayLen;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("service-api/contents/")
@CrossOrigin(origins = "http://localhost:3000")
public class ContentController {

    private final ContentService contentService;

    @GetMapping
    public List<ContentDto> getContents() {
        return contentService.getAll();
    }

    @GetMapping("/id/{id}")
    public ContentDto getContent(@PathVariable int id) {
        return contentService.getById(id);
    }

    @GetMapping("/user/{id}")
    public List<ContentDto> getContentByUserId(@PathVariable int id) {
        return contentService.getByUserId(id);
    }

    @GetMapping("/category/{categoryName}")
    public List<ContentDto> getContentsByCategory(@PathVariable String categoryName) {
        return contentService.getByCategory(categoryName);
    }

    @GetMapping("/title/{title}")
    public ContentDto getContentByTitle(@PathVariable String title) {
        return contentService.getByTitle(title);
    }

    @GetMapping("/title-containing/{title}")
    public List<ContentDto> getContentByTitleContaining(@PathVariable String title) {
        return contentService.getByTitleContaining(title);
    }

    @PostMapping
    public ContentDto addNewContent(@RequestParam String title, @RequestParam String description, @RequestParam int userId, @RequestParam int categoryId) {
        List<TagDto> tags = new ArrayList<>();
        return contentService.addNew(new ContentDto(0, title, description, null, new UserDto(), new CategoryDto(), new ExternalResourcesDto(), tags), userId, categoryId);
    }

    @PutMapping
    public ContentDto updateContent(@RequestParam String title, @RequestParam String description, @RequestParam int id) {
        return contentService.updateContent(new ContentDto(id, title, description));
    }

    @DeleteMapping("{id}")
    public void deleteContent(@PathVariable int id) {
        contentService.deleteContent(id);
    }
}
