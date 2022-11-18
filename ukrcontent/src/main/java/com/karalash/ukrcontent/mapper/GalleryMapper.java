package com.karalash.ukrcontent.mapper;

import com.karalash.ukrcontent.dto.GalleryDto;
import com.karalash.ukrcontent.model.entities.Gallery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GalleryMapper implements Mapper<GalleryDto, Gallery>{

    private final ContentMapper contentMapper;

    @Override
    public GalleryDto toDto(Gallery input) {
        return GalleryDto.builder()
                .id(input.getId())
                .imgPath(input.getImgPath())
                .dateTime(input.getDateTime())
                .content(contentMapper.toDto(input.getContent()))
                .build();
    }

    @Override
    public Gallery toEntity(GalleryDto input) {
        Gallery entity = new Gallery();
        entity.setId(input.getId());
        entity.setImgPath(input.getImgPath());
        entity.setDateTime(input.getDateTime());
        entity.setContent(contentMapper.toEntity(input.getContent()));
        return entity;
    }
}
