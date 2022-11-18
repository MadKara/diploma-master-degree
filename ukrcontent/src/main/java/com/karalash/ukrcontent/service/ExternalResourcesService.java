package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.ExternalResourcesDto;

public interface ExternalResourcesService {
    ExternalResourcesDto getById(int id);

    ExternalResourcesDto updateExtResources(ExternalResourcesDto resources);
}
