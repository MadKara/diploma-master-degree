package com.karalash.ukrcontent.mapper;

import com.karalash.ukrcontent.dto.ContentDto;
import com.karalash.ukrcontent.model.entities.Content;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContentMapper implements Mapper<ContentDto, Content> {

    private final ExternalResourcesMapper externalResourcesMapper;

    @Override
    public ContentDto toDto(Content input) {
        return ContentDto.builder()
                .id(input.getId())
                .title(input.getTitle())
                .description(input.getDescription())
                //.externalResources(externalResourcesMapper.toDto(input.getExternalResources()))  //
                .build();
    }

    @Override
    public Content toEntity(ContentDto input) {
        Content entity = new Content();
        entity.setId(input.getId());
        entity.setTitle(input.getTitle());
        entity.setDescription(input.getDescription());
        //entity.setExternalResources(externalResourcesMapper.toEntity(input.getExternalResources()));
        return entity;
    }
}
