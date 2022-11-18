package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.TagDto;

import java.util.List;

public interface TagService {
    List<TagDto> getAll();

    List<TagDto> getAllTagsByContentId(int contentId);

    TagDto getTagById(int id);

    void deleteTagById(int id);

    void deleteTagFromContent(int contentId, int tagId);

    TagDto updateTag(TagDto tag);

    TagDto addNewTag(TagDto tag);

    TagDto createAndAddNewTagToContent(TagDto tag, int contentId);

    TagDto addTagToContent(int contentId, int tagId);
}
