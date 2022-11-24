package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.ExternalResourcesDto;
import com.karalash.ukrcontent.service.ExternalResourcesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("service-api/contents/ext-resources")
@CrossOrigin(origins = "http://localhost:3000")
public class ExtResourcesController {

    private final ExternalResourcesService externalResourcesService;

    @GetMapping("{id}")
    public ExternalResourcesDto getExtResources(@PathVariable int id) {
        return externalResourcesService.getById(id);
    }

    @PutMapping
    public ExternalResourcesDto updateContentExtResources(@RequestParam String instagram, @RequestParam String twitter, @RequestParam int id,
                                                          @RequestParam String mainLink) {
        return externalResourcesService.updateExtResources(new ExternalResourcesDto(id, twitter, instagram, mainLink));
    }
}
