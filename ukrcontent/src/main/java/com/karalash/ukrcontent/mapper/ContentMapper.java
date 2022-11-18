package com.karalash.ukrcontent.mapper;

import com.karalash.ukrcontent.dto.ContentDto;
import com.karalash.ukrcontent.model.entities.Content;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContentMapper implements Mapper<ContentDto, Content> {

    private final ExternalResourcesMapper externalResourcesMapper;
    private final UserMapper userMapper;
    private final CategoryMapper categoryMapper;
    private final TagMapper tagMapper;

    @Override
    public ContentDto toDto(Content input) {
        return ContentDto.builder()
                .id(input.getId())
                .title(input.getTitle())
                .description(input.getDescription())
                .dateTime(input.getDateTime())
                .user(userMapper.toDto(input.getUser()))
                .category(categoryMapper.toDto(input.getCategory()))
                .externalResources(externalResourcesMapper.toDto(input.getExternalResources()))  //
                .tags(tagMapper.toDtos(input.getTags()))
                .build();
    }

    @Override
    public Content toEntity(ContentDto input) {
        Content entity = new Content();
        entity.setId(input.getId());
        entity.setTitle(input.getTitle());
        entity.setDescription(input.getDescription());
        entity.setDateTime(input.getDateTime());
        entity.setUser(userMapper.toEntity(input.getUser()));
        entity.setCategory(categoryMapper.toEntity(input.getCategory()));
        entity.setExternalResources(externalResourcesMapper.toEntity(input.getExternalResources()));
        entity.setTags(tagMapper.toEntities(input.getTags()));
        return entity;
    }
}
