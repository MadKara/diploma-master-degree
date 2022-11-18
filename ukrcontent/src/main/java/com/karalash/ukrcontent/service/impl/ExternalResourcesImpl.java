package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.dto.ExternalResourcesDto;
import com.karalash.ukrcontent.mapper.ExternalResourcesMapper;
import com.karalash.ukrcontent.model.entities.ExternalResources;
import com.karalash.ukrcontent.repos.ExternalResourcesRepo;
import com.karalash.ukrcontent.service.ExternalResourcesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExternalResourcesImpl implements ExternalResourcesService {

    private final ExternalResourcesRepo externalResourcesRepo;
    private final ExternalResourcesMapper externalResourcesMapper;

    @Override
    public ExternalResourcesDto getById(int id) {
        ExternalResources extResEntity = externalResourcesRepo.findById(id);

        return externalResourcesMapper.toDto(extResEntity);
    }

    @Override
    public ExternalResourcesDto updateExtResources(ExternalResourcesDto resources) {
        ExternalResources extResEntity = externalResourcesRepo.findById(resources.getId());
        extResEntity.setInstagram(resources.getInstagram());
        extResEntity.setTwitter(resources.getTwitter());
        externalResourcesRepo.save(extResEntity);

        return externalResourcesMapper.toDto(extResEntity);
    }
}
