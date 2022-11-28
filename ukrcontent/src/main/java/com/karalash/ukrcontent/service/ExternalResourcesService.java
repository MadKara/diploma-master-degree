package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.ExternalResourcesDto;

import java.io.IOException;

public interface ExternalResourcesService {
    ExternalResourcesDto getById(int id);

    ExternalResourcesDto updateExtResources(ExternalResourcesDto resources) throws IOException;
}
