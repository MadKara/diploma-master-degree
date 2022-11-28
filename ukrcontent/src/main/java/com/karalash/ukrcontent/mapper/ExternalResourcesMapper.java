package com.karalash.ukrcontent.mapper;

import com.karalash.ukrcontent.dto.ExternalResourcesDto;
import com.karalash.ukrcontent.model.entities.ExternalResources;
import org.springframework.stereotype.Component;

@Component
public class ExternalResourcesMapper implements Mapper<ExternalResourcesDto, ExternalResources>{

    @Override
    public ExternalResourcesDto toDto(ExternalResources input) {
        return ExternalResourcesDto.builder()
                .id(input.getId())
                .twitter(input.getTwitter())
                .instagram(input.getInstagram())
                .tiktok(input.getTiktok())
                .telegram(input.getTelegram())
                .youtube(input.getYoutube())
                .browseLink(input.getBrowseLink())
                .build();
    }

    @Override
    public ExternalResources toEntity(ExternalResourcesDto input) {
        ExternalResources entity = new ExternalResources();
        entity.setId(input.getId());
        entity.setTwitter(input.getTwitter());
        entity.setInstagram(input.getInstagram());
        entity.setTiktok(input.getTiktok());
        entity.setTelegram(input.getTelegram());
        entity.setYoutube(input.getYoutube());
        entity.setBrowseLink(input.getBrowseLink());
        return entity;
    }
}
