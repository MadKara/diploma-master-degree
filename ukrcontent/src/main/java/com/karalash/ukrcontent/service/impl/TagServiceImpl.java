package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.dto.TagDto;
import com.karalash.ukrcontent.mapper.ContentMapper;
import com.karalash.ukrcontent.mapper.TagMapper;
import com.karalash.ukrcontent.model.entities.Content;
import com.karalash.ukrcontent.model.entities.Tag;
import com.karalash.ukrcontent.repos.ContentRepo;
import com.karalash.ukrcontent.repos.TagRepo;
import com.karalash.ukrcontent.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepo tagRepo;
    private final ContentRepo contentRepo;
    private final TagMapper tagMapper;
    private final ContentMapper contentMapper;

    @Override
    public List<TagDto> getAll() {
        List<Tag> tags = tagRepo.findAll();
        return tagMapper.toDtos(tags);
    }

    @Override
    public List<TagDto> getAllTagsByContentId(int contentId) {
        List<Tag> tags = tagRepo.findAllByContents_Id(contentId);
        return tagMapper.toDtos(tags);
    }

    @Override
    public TagDto getTagById(int id) {
        Optional<Tag> tagById = tagRepo.findById(id);
        if (tagById.isEmpty()) {
            throw new IllegalArgumentException("Not found tag with id: " + tagById);
        }
        Tag tagEntity = tagById.get();
        return tagMapper.toDto(tagEntity);
    }

    @Override
    public void deleteTagById(int id) {
        tagRepo.deleteById(id);
    }

    @Override
    public void deleteTagFromContent(int contentId, int tagId) {
        Optional<Content> contentById = contentRepo.findById(contentId);
        if (contentById.isEmpty()) {
            throw new IllegalArgumentException("Not found content with id: " + contentById);
        }
        Content contentEntity = contentById.get();

        var contentWithRemovedTag = contentEntity
                .getTags().stream()
                .filter(tag -> tag.getId() != tagId)
                .collect(Collectors.toList());

        contentEntity.setTags(contentWithRemovedTag);
        contentRepo.save(contentEntity);
    }

    @Override
    public TagDto updateTag(TagDto tag) {  //ne praciuvav
        Optional<Tag> tagById = tagRepo.findById(tag.getId());
        if (tagById.isEmpty()) {
            throw new IllegalArgumentException("Not found tag with id: " + tagById);
        }
        Tag tagEntity = tagById.get();
        tagEntity.setLabel(tag.getLabel());
        tagRepo.save(tagEntity);

        return tagMapper.toDto(tagEntity);
    }

    @Override
    public TagDto addNewTag(TagDto tag) {
        Tag tagEntity = tagMapper.toEntity(tag);
        tagRepo.save(tagEntity);
        return tagMapper.toDto(tagEntity);
    }

    @Override
    public TagDto createAndAddNewTagToContent(TagDto tag, int contentId) {
        Tag tagEntity = tagMapper.toEntity(tag);
        tagRepo.save(tagEntity);

        Optional<Content> contentById = contentRepo.findById(contentId);
        if (contentById.isEmpty()) {
            throw new IllegalArgumentException("Not found content with id: " + contentById);
        }
        Content contentEntity = contentById.get();
        contentEntity.getTags().add(tagEntity);
        contentRepo.save(contentEntity);

        return tagMapper.toDto(tagEntity);
    }

    @Override
    public TagDto addTagToContent(int contentId, int tagId) {
        Optional<Content> contentById = contentRepo.findById(contentId);
        if (contentById.isEmpty()) {
            throw new IllegalArgumentException("Not found content with id: " + contentById);
        }
        Content contentEntity = contentById.get();

        Optional<Tag> tagById = tagRepo.findById(tagId);
        if (tagById.isEmpty()) {
            throw new IllegalArgumentException("Not found tag with id: " + tagById);
        }
        Tag tagEntity = tagById.get();

        contentEntity.getTags().add(tagEntity);
        contentRepo.save(contentEntity);

        return tagMapper.toDto(tagEntity);
    }
}
