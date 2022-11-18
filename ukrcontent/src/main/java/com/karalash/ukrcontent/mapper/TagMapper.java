package com.karalash.ukrcontent.mapper;

import com.karalash.ukrcontent.dto.TagDto;
import com.karalash.ukrcontent.model.entities.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TagMapper implements Mapper<TagDto, Tag>{
//    private final ContentMapper contentMapper;

    @Override
    public TagDto toDto(Tag input) {
        return TagDto.builder()
                .id(input.getId())
                .label(input.getLabel())
//                .contents(contentMapper.toDtos(input.getContents()))
                .build();
    }

    @Override
    public Tag toEntity(TagDto input) {
        Tag entity = new Tag();
        entity.setId(input.getId());
        entity.setLabel(input.getLabel());
//        entity.setContents(contentMapper.toEntities(input.getContents()));

        return entity;
    }
}
