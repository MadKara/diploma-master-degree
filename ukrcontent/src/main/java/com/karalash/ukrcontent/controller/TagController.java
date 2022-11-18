package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.TagDto;
import com.karalash.ukrcontent.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("service-api/tags/")
@CrossOrigin(origins = "http://localhost:3000")
public class TagController {

    private final TagService tagService;

    @GetMapping
    public List<TagDto> getTags() {
        return tagService.getAll();
    }

    @GetMapping("{id}")
    public TagDto getTagById(@PathVariable int id) {
        return tagService.getTagById(id);
    }

    @GetMapping("/content/{contentId}")
    public List<TagDto> getTags(@PathVariable int contentId) {
        return tagService.getAllTagsByContentId(contentId);
    }

    @PostMapping
    public TagDto addNewTag(@RequestParam String label) {
        return tagService.addNewTag(new TagDto(0, label));
    }

    @PostMapping("/new-to-content/")
    public TagDto addNewTagToContent(@RequestParam String label, @RequestParam int contentId) {
        return tagService.createAndAddNewTagToContent(new TagDto(0, label), contentId);
    }

    @PostMapping("/to-content/")
    public TagDto addTagToContent(@RequestParam int contentId, @RequestParam int tagId) {
        return tagService.addTagToContent(contentId, tagId);
    }

    @PutMapping
    public TagDto updateTag(@RequestParam int id, @RequestParam String label) {
        return tagService.updateTag(new TagDto(id, label));
    }

    @DeleteMapping("{id}")
    public void deleteTag(@PathVariable int id) {
        tagService.deleteTagById(id);
    }

    @DeleteMapping("/remove-from-content/")
    public void deleteTagFromContent(@RequestParam int contentId, @RequestParam int tagId) {
        tagService.deleteTagFromContent(contentId, tagId);
    }
}
